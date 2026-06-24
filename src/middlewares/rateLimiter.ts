import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs:
    15 * 60 * 1000,

  max:
    process.env.NODE_ENV === "production"
      ? 300
      : 1000,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many requests. Please try again later.",
  },
});