"use server";

import { Resend } from "resend";
import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize Upstash Redis for Rate Limiting (fallback to in-memory if not configured for local dev)
const redis = process.env.UPSTASH_REDIS_REST_URL 
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

// Rate limit: 5 requests per 10 minutes per IP
const ratelimit = redis ? new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(5, "10 m"),
}) : null;

// Zod Schema for validation
const contactSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name is too long"),
    email: z.string().email("Invalid email address").max(100, "Email is too long"),
    message: z.string().min(10, "Message must be at least 10 characters").max(5000, "Message is too long"),
    website: z.string().max(0, "Honeypot triggered").optional(), // Honeypot must be empty
    turnstileToken: z.string().min(1, "Turnstile token is missing"),
});

export type ActionState = {
    success: boolean;
    error?: string;
    message?: string;
    timestamp?: number;
};

export async function sendEmailAction(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    try {
        // 1. Extract and validate data
        const rawData = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            message: formData.get("message") as string,
            website: formData.get("website") as string, // Honeypot
            // Fallback to "bypass-for-testing" if Turnstile is disabled
            turnstileToken: (formData.get("cf-turnstile-response") || "bypass-for-testing") as string,
        };

        const validatedData = contactSchema.safeParse(rawData);

        if (!validatedData.success) {
            // Return the first validation error
            return {
                success: false,
                error: validatedData.error.errors[0].message,
                timestamp: Date.now(),
            };
        }

        const { name, email, message, turnstileToken } = validatedData.data;

        // 2. Rate Limiting (using a static ID if IP isn't easily available, but ideally get client IP)
        if (ratelimit) {
            // Note: In App Router Server Actions, getting IP is tricky without passing it from middleware or headers.
            const headersList = await headers();
            const ip = headersList.get("x-forwarded-for") || "anonymous";
            
            const { success } = await ratelimit.limit(`contact_${ip}`);
            if (!success) {
                return {
                    success: false,
                    error: "Too many requests. Please try again later.",
                    timestamp: Date.now(),
                };
            }
        }

        // 3. Turnstile Verification
        if (process.env.TURNSTILE_SECRET_KEY && turnstileToken !== "bypass-for-testing") {
            const turnstileResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}`,
            });

            const turnstileResult = await turnstileResponse.json();

            if (!turnstileResult.success) {
                return {
                    success: false,
                    error: "Bot verification failed. Please try again.",
                    timestamp: Date.now(),
                };
            }
        }

        // 4. Send Email via Resend
        if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
            console.error("Missing Resend API Key or Contact Email in environment variables.");
            return {
                success: false,
                error: "Server configuration error. Please try again later.",
                timestamp: Date.now(),
            };
        }

        // We use a verified domain sender, and replyTo as the user's email
        // Fallback to onboarding domain if custom domain isn't set up yet
        const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev'; 

        const { error } = await resend.emails.send({
            from: `Portfolio Contact <${fromEmail}>`,
            to: process.env.CONTACT_EMAIL,
            replyTo: email,
            subject: `New Contact Request from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });

        if (error) {
            console.error("Resend API Error:", error);
            return {
                success: false,
                error: "Failed to send the message. Please try again later.",
                timestamp: Date.now(),
            };
        }

        return {
            success: true,
            message: "Transmission received. I'll get back to you soon.",
            timestamp: Date.now(),
        };

    } catch (error) {
        console.error("Server Action Error:", error);
        return {
            success: false,
            error: "Something went wrong. Please try again.",
            timestamp: Date.now(),
        };
    }
}
