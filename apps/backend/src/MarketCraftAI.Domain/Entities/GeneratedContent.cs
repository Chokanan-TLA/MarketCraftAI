using MarketCraftAI.Domain.Common;

namespace MarketCraftAI.Domain.Entities;

public class GeneratedContent : AuditableEntity
{
    public Guid ContentRequestId { get; set; }
    public int Version { get; set; } = 1;

    /// <summary>Raw JSON result returned by the LLM provider (jsonb column).</summary>
    public string GeneratedResult { get; set; } = string.Empty;

    public ContentRequest? ContentRequest { get; set; }
    public ICollection<Approval> Approvals { get; set; } = new List<Approval>();
}
