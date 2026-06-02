import { z } from "zod";

export const newsletterSignupSchema = z.object({
  email: z.string().email("Enter a valid email address."),
});

export type NewsletterSignupInput = z.infer<typeof newsletterSignupSchema>;

