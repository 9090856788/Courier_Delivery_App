import { limiter } from "express-rate-limit";

// Global rate limiter middleware
export const globalAPILimiter = limiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again after 15 minutes.",
});

export const authLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message:
    "Too many login attempts from this IP, please try again after 15 minutes.",
});
