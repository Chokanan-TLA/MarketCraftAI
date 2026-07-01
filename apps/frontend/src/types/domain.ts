export type UserRole = "Admin" | "Marketer" | "Approver" | "Viewer";
export type CampaignStatus = "Draft" | "Active" | "Paused" | "Completed" | "Archived";
export type ContentRequestStatus = "Pending" | "Processing" | "Completed" | "Failed";
export type ApprovalStatus = "Pending" | "Approved" | "Rejected";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
}

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  status: CampaignStatus;
  owner: User;
  contentRequestCount: number;
  createdAt: string;
}

export interface ContentRequest {
  id: string;
  campaignId: string;
  campaignName: string;
  prompt: string;
  status: ContentRequestStatus;
  createdAt: string;
}

export interface DashboardStats {
  totalCampaigns: number;
  activeCampaigns: number;
  contentGenerated: number;
  pendingApprovals: number;
}
