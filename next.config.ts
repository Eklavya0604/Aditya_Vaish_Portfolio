import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    // shortcut: no Content-Security-Policy yet — it needs a nonce for the inline
    // JSON-LD and <style> tags. Add one when a CSP report-only pass is set up.
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
