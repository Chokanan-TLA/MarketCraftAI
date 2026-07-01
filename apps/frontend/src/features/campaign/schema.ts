import { z } from "zod";

export const campaignSchema = z.object({
  name: z.string().min(1, "Campaign name is required").max(256),
  description: z.string().max(1000).optional().or(z.literal("")),
  status: z.enum(["Draft", "Active", "Paused", "Completed", "Archived"]),
});

export type CampaignFormValues = z.infer<typeof campaignSchema>;
