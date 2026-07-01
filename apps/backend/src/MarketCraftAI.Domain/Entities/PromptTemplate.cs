using MarketCraftAI.Domain.Common;

namespace MarketCraftAI.Domain.Entities;

public class PromptTemplate : AuditableEntity
{
    public string Name { get; set; } = string.Empty;
    public string TemplateText { get; set; } = string.Empty;
    public int Version { get; set; } = 1;
    public bool IsActive { get; set; } = true;

    public ICollection<ContentRequest> ContentRequests { get; set; } = new List<ContentRequest>();
}
