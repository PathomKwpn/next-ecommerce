import { newsletterSignupSchema } from "@/lib/validations/newsletter";

export async function subscribeToNewsletter(input: unknown) {
  const parsedInput = newsletterSignupSchema.parse(input);

  return {
    email: parsedInput.email,
    subscribed: true,
    createdAt: new Date().toISOString(),
  };
}

