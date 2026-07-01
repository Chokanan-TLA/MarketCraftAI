using MarketCraftAI.Domain.Common;
using MarketCraftAI.Domain.Enums;

namespace MarketCraftAI.Domain.Entities;

public class Campaign : AuditableEntity
{
    public Guid OwnerId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public CampaignStatus Status { get; set; } = CampaignStatus.Draft;

    public User? Owner { get; set; }
    public ICollection<ContentRequest> ContentRequests { get; set; } = new List<ContentRequest>();
    public ICollection<Analytics> AnalyticsRecords { get; set; } = new List<Analytics>();
}
