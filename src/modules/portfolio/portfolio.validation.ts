import { z } from "zod";

export const createPortfolioSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(3, "Portfolio name is required"),

    slug: z
      .string()
      .trim()
      .min(2, "Slug is required")
      .max(20, "Slug cannot exceed 20 characters")
      .regex(
        /^[a-z0-9-]+$/,
        "Slug can only contain lowercase letters, numbers and hyphens"
      ),
  }),
});