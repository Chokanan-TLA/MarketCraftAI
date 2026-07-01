using MarketCraftAI.Domain.Common;

namespace MarketCraftAI.Domain.Entities;

public class Analytics : AuditableEntity
{
    public Guid CampaignId { get; set; }
    public string MetricName { get; set; } = string.Empty;
    public decimal MetricValue { get; set; }
    public DateTime RecordedAt { get; set; }

    /// <summary>Extra dimensions for the metric (jsonb column).</summary>
    public string? Metadata { get; set; }

    public Campaign? Campaign { get; set; }
}
