import type { Campaign, ContentRequest, GeneratedContent, User } from "@/types/domain";

export const seedUsers: Record<string, User> = {
  jane: { id: "u-1", fullName: "Jane Cooper", email: "jane@marketcraft.ai", role: "Marketer" },
  arun: { id: "u-2", fullName: "Arun Somsak", email: "arun@marketcraft.ai", role: "Marketer" },
  lin: { id: "u-3", fullName: "Lin Watanabe", email: "lin@marketcraft.ai", role: "Approver" },
};

export const currentUser: User = seedUsers.jane;

export const seedCampaigns: Campaign[] = [
  {
    id: "c-1",
    name: "Summer Sale 2026",
    description: "Cross-channel promo for the July clearance sale",
    status: "Active",
    owner: seedUsers.jane,
    createdAt: "2026-06-18T09:00:00Z",
  },
  {
    id: "c-2",
    name: "Product Launch — Aurora",
    description: "Launch campaign for the Aurora product line",
    status: "Active",
    owner: seedUsers.arun,
    createdAt: "2026-06-22T09:00:00Z",
  },
  {
    id: "c-3",
    name: "Q3 Newsletter Series",
    status: "Draft",
    owner: seedUsers.jane,
    createdAt: "2026-06-27T09:00:00Z",
  },
  {
    id: "c-4",
    name: "Loyalty Program Refresh",
    status: "Paused",
    owner: seedUsers.lin,
    createdAt: "2026-06-10T09:00:00Z",
  },
  {
    id: "c-5",
    name: "Spring Collection Recap",
    status: "Completed",
    owner: seedUsers.arun,
    createdAt: "2026-05-02T09:00:00Z",
  },
];

export const seedContentRequests: ContentRequest[] = [
  {
    id: "r-1",
    campaignId: "c-1",
    prompt: "Write 3 Instagram captions announcing 30% off storewide",
    status: "Completed",
    createdAt: "2026-06-30T14:20:00Z",
  },
  {
    id: "r-2",
    campaignId: "c-2",
    prompt: "Draft a launch-day email subject line A/B test set",
    status: "Completed",
    createdAt: "2026-06-30T11:05:00Z",
  },
  {
    id: "r-3",
    campaignId: "c-1",
    prompt: "Generate a Facebook ad variant targeting returning customers",
    status: "Pending",
    createdAt: "2026-06-30T10:42:00Z",
  },
  {
    id: "r-4",
    campaignId: "c-4",
    prompt: "Summarize benefits copy for the new tier structure",
    status: "Failed",
    createdAt: "2026-06-29T16:10:00Z",
  },
  {
    id: "r-5",
    campaignId: "c-2",
    prompt: "Write a press release intro paragraph",
    status: "Completed",
    createdAt: "2026-06-29T09:30:00Z",
  },
];

export const seedGeneratedContents: GeneratedContent[] = [
  {
    id: "g-1",
    contentRequestId: "r-1",
    version: 1,
    generatedResult:
      "1) Summer just got sweeter — 30% off storewide, today only. 2) Sun's out, savings out: 30% off everything. 3) Your closet called — it wants 30% off new arrivals.",
    createdAt: "2026-06-30T14:21:30Z",
  },
  {
    id: "g-2",
    contentRequestId: "r-2",
    version: 1,
    generatedResult:
      "A) Aurora is here. B) Meet Aurora — available now. C) The wait is over: Aurora has launched.",
    createdAt: "2026-06-30T11:06:45Z",
  },
  {
    id: "g-3",
    contentRequestId: "r-5",
    version: 1,
    generatedResult:
      "MarketCraft AI today announced the launch of Aurora, a new product line designed to help marketing teams move from brief to published content in minutes instead of days.",
    createdAt: "2026-06-29T09:31:10Z",
  },
];
