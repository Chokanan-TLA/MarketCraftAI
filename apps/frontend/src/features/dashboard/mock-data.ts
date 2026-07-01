import type { Campaign, ContentRequest, DashboardStats, User } from "@/types/domain";

const users: Record<string, User> = {
  jane: { id: "u-1", fullName: "Jane Cooper", email: "jane@marketcraft.ai", role: "Marketer" },
  arun: { id: "u-2", fullName: "Arun Somsak", email: "arun@marketcraft.ai", role: "Marketer" },
  lin: { id: "u-3", fullName: "Lin Watanabe", email: "lin@marketcraft.ai", role: "Approver" },
};

export const mockCampaigns: Campaign[] = [
  {
    id: "c-1",
    name: "Summer Sale 2026",
    description: "Cross-channel promo for the July clearance sale",
    status: "Active",
    owner: users.jane,
    contentRequestCount: 12,
    createdAt: "2026-06-18T09:00:00Z",
  },
  {
    id: "c-2",
    name: "Product Launch — Aurora",
    description: "Launch campaign for the Aurora product line",
    status: "Active",
    owner: users.arun,
    contentRequestCount: 8,
    createdAt: "2026-06-22T09:00:00Z",
  },
  {
    id: "c-3",
    name: "Q3 Newsletter Series",
    status: "Draft",
    owner: users.jane,
    contentRequestCount: 3,
    createdAt: "2026-06-27T09:00:00Z",
  },
  {
    id: "c-4",
    name: "Loyalty Program Refresh",
    status: "Paused",
    owner: users.lin,
    contentRequestCount: 5,
    createdAt: "2026-06-10T09:00:00Z",
  },
  {
    id: "c-5",
    name: "Spring Collection Recap",
    status: "Completed",
    owner: users.arun,
    contentRequestCount: 15,
    createdAt: "2026-05-02T09:00:00Z",
  },
];

export const mockRecentContentRequests: ContentRequest[] = [
  {
    id: "r-1",
    campaignId: "c-1",
    campaignName: "Summer Sale 2026",
    prompt: "Write 3 Instagram captions announcing 30% off storewide",
    status: "Completed",
    createdAt: "2026-06-30T14:20:00Z",
  },
  {
    id: "r-2",
    campaignId: "c-2",
    campaignName: "Product Launch — Aurora",
    prompt: "Draft a launch-day email subject line A/B test set",
    status: "Processing",
    createdAt: "2026-06-30T11:05:00Z",
  },
  {
    id: "r-3",
    campaignId: "c-1",
    campaignName: "Summer Sale 2026",
    prompt: "Generate a Facebook ad variant targeting returning customers",
    status: "Pending",
    createdAt: "2026-06-30T10:42:00Z",
  },
  {
    id: "r-4",
    campaignId: "c-4",
    campaignName: "Loyalty Program Refresh",
    prompt: "Summarize benefits copy for the new tier structure",
    status: "Failed",
    createdAt: "2026-06-29T16:10:00Z",
  },
  {
    id: "r-5",
    campaignId: "c-2",
    campaignName: "Product Launch — Aurora",
    prompt: "Write a press release intro paragraph",
    status: "Completed",
    createdAt: "2026-06-29T09:30:00Z",
  },
];

export const mockDashboardStats: DashboardStats = {
  totalCampaigns: mockCampaigns.length,
  activeCampaigns: mockCampaigns.filter((c) => c.status === "Active").length,
  contentGenerated: 47,
  pendingApprovals: 6,
};
