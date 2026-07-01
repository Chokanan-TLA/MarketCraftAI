using MarketCraftAI.Domain.Common;
using MarketCraftAI.Domain.Enums;

namespace MarketCraftAI.Domain.Entities;

public class Approval : AuditableEntity
{
    public Guid GeneratedContentId { get; set; }
    public Guid ApproverId { get; set; }
    public ApprovalStatus Status { get; set; } = ApprovalStatus.Pending;
    public string? Comment { get; set; }

    public GeneratedContent? GeneratedContent { get; set; }
    public User? Approver { get; set; }
}
