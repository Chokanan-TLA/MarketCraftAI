namespace MarketCraftAI.Domain.Enums;

public enum UserRole
{
    Admin,
    Marketer,
    Approver,
    Viewer
}

public enum CampaignStatus
{
    Draft,
    Active,
    Paused,
    Completed,
    Archived
}

public enum ContentRequestStatus
{
    Pending,
    Processing,
    Completed,
    Failed
}

public enum ApprovalStatus
{
    Pending,
    Approved,
    Rejected
}
