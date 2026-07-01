import { z } from "zod";

export const settingsSchema = z.object({
  fullName: z.string().min(1, "Full name is required").max(256),
  email: z.string().email("Enter a valid email address"),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;
