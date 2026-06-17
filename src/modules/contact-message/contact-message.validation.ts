import { z } from "zod";

const createContactMessageSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    subject: z.string().min(1),
    message: z.string().min(1),
  }),
});

export const ContactMessageValidation = {
  createContactMessageSchema,
};