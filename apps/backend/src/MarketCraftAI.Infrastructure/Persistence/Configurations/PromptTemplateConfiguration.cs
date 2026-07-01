using MarketCraftAI.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MarketCraftAI.Infrastructure.Persistence.Configurations;

public class PromptTemplateConfiguration : IEntityTypeConfiguration<PromptTemplate>
{
    public void Configure(EntityTypeBuilder<PromptTemplate> builder)
    {
        builder.Property(t => t.Name).IsRequired().HasMaxLength(256);
        builder.Property(t => t.TemplateText).IsRequired();

        builder.HasIndex(t => new { t.Name, t.Version }).IsUnique();
        builder.HasIndex(t => t.CreatedAt);
    }
}