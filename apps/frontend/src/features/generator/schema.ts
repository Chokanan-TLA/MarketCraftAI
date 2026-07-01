import { z } from "zod";

export const generatorSchema = z.object({
  campaignId: z.string().min(1, "Select a campaign"),
  prompt: z.string().min(10, "Prompt should be at least 10 characters"),
});

export type GeneratorFormValues = z.infer<typeof generatorSchema>;
