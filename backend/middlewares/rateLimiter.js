import { rateLimit } from "express-rate-limit";

const skipRateLimit = (req) => {
  const url = req.originalUrl || req.url || "";
  return url.startsWith("/api/docs") || url === "/health";
};

// Global rate limiter middleware
export const globalAPILimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipRateLimit,
  message: "Too many requests from this IP, please try again after 15 minutes.",
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipRateLimit,
  message:
    "Too many login attempts from this IP, please try again after 15 minutes.",
});
