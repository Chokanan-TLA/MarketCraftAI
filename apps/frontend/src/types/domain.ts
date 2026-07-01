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
  createdAt: string;
}

export interface ContentRequest {
  id: string;
  campaignId: string;
  prompt: string;
  status: ContentRequestStatus;
  createdAt: string;
}

export interface GeneratedContent {
  id: string;
  contentRequestId: string;
  version: number;
  generatedResult: string;
  createdAt: string;
}

export interface DashboardStats {
  totalCampaigns: number;
  activeCampaigns: number;
  contentGenerated: number;
  pendingApprovals: number;
}
