using MarketCraftAI.Domain.Common;
using MarketCraftAI.Domain.Enums;

namespace MarketCraftAI.Domain.Entities;

public class ContentRequest : AuditableEntity
{
    public Guid CampaignId { get; set; }
    public Guid? PromptTemplateId { get; set; }
    public string Prompt { get; set; } = string.Empty;
    public ContentRequestStatus Status { get; set; } = ContentRequestStatus.Pending;

    /// <summary>Raw JSON payload sent to the LLM provider (jsonb column).</summary>
    public string? PromptPayload { get; set; }

    public Campaign? Campaign { get; set; }
    public PromptTemplate? PromptTemplate { get; set; }
    public ICollection<GeneratedContent> GeneratedContents { get; set; } = new List<GeneratedContent>();
}
