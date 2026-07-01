using MarketCraftAI.Domain.Common;
using MarketCraftAI.Domain.Enums;

namespace MarketCraftAI.Domain.Entities;

public class User : AuditableEntity
{
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public UserRole Role { get; set; } = UserRole.Marketer;

    public ICollection<Campaign> Campaigns { get; set; } = new List<Campaign>();
}
