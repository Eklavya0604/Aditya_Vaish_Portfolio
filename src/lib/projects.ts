import { SITE } from "./seo";

export const projects = [
  {
    slug: "spring-sentinel",
    name: "SpringSentinel",
    type: "Microservice backend",
    description:
      "A Spring Boot REST backend that combines PostgreSQL persistence with Redis guardrails for authenticated social interactions.",
    technologies: ["Java", "Spring Boot", "Spring Security", "PostgreSQL", "Redis", "Docker"],
    github: "https://github.com/Eklavya0604/SpringSentinel",
    problem:
      "Concurrent bot interactions, nested comments, authentication, and rate limits need to remain safe while the backend stays stateless.",
    solution:
      "SpringSentinel uses JWT-based identity, role-based access control, PostgreSQL for durable data, and atomic Redis operations for rate limits and virality guardrails.",
    architecture:
      "Requests pass through rate-limit and JWT filters before reaching Spring Boot controllers and services. PostgreSQL stores users, posts, comments, and bots; Redis holds short-lived counters, cooldowns, queues, and real-time scores.",
    features: [
      "JWT authentication with USER and ADMIN roles",
      "Nested comment threads with server-calculated depth",
      "Atomic Redis Lua guardrails for concurrent bot interactions",
      "Distributed rate limiting and notification throttling",
      "OpenAPI/Swagger documentation and Docker setup",
    ],
    decisions:
      "Identity is resolved from the JWT rather than trusted from request bodies. Redis reservations are rolled back when a later PostgreSQL write fails, keeping the two stores aligned.",
    result:
      "The project demonstrates backend architecture for concurrency-sensitive APIs, with a clear separation between persistent storage and real-time state.",
  },
  {
    slug: "vypaar-manch",
    name: "Vypaar Manch",
    type: "Full-stack marketplace",
    description:
      "A local service marketplace platform with service tracking, reviews, and WhatsApp API automation.",
    technologies: ["React", "TypeScript", "APIs", "Database integration"],
    github: "https://github.com/Eklavya0604/Vypaar_Manch",
    live: "https://vypaarmanch.adityavaish.dev/",
    problem:
      "Local services need a focused digital workflow for discovery, communication, tracking, and trust signals such as reviews.",
    solution:
      "Vypaar Manch brings those interactions into one full-stack product, connecting a responsive interface to service and review workflows.",
    architecture:
      "The project is organized as a frontend application backed by APIs and data workflows for service discovery, tracking, reviews, and messaging automation.",
    features: [
      "Service marketplace flows",
      "End-to-end service tracking",
      "Review modules",
      "WhatsApp API automation",
      "Responsive product interface",
    ],
    decisions:
      "The product keeps the main service journey visible and task-oriented, reducing the distance between finding a provider and following progress.",
    result:
      "A practical full-stack product exercise focused on turning a local-business workflow into an approachable web experience.",
  },
  {
    slug: "spamshield",
    name: "SpamShield",
    type: "Machine learning application",
    description:
      "An email spam classification application using TF-IDF features with Naive Bayes and Logistic Regression models.",
    technologies: ["Python", "scikit-learn", "TF-IDF", "Naive Bayes", "Logistic Regression", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/Eklavya0604/SpamShield",
    paper: "https://www.inderscienceonline.com/doi/abs/10.1504/IJCE.2026.155529",
    problem:
      "Email text must be transformed into useful numerical features before a classification model can distinguish spam from legitimate messages.",
    solution:
      "SpamShield preprocesses email text, applies TF-IDF vectorization, and compares predictions from two classical machine-learning models through a simple web interface.",
    architecture:
      "A browser interface sends email text to a Python-backed classification workflow. Preprocessing and vectorization feed Naive Bayes and Logistic Regression models, whose predictions and confidence are returned to the user.",
    features: [
      "Real-time email classification",
      "Naive Bayes and Logistic Regression model comparison",
      "Confidence score display",
      "Text preprocessing and TF-IDF features",
      "Responsive browser interface",
    ],
    decisions:
      "Using two lightweight, interpretable classifiers makes model behavior easier to compare while keeping prediction fast for an interactive demo.",
    result:
      "The project connects an applied machine-learning pipeline with a usable web interface and a published research reference.",
  },
] as const;

export type Project = (typeof projects)[number];

export function projectUrl(slug: string) {
  return `${SITE}/projects/${slug}`;
}
