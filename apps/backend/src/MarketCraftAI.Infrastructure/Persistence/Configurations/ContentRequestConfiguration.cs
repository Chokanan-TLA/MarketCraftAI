using MarketCraftAI.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MarketCraftAI.Infrastructure.Persistence.Configurations;

public class ContentRequestConfiguration : IEntityTypeConfiguration<ContentRequest>
{
    public void Configure(EntityTypeBuilder<ContentRequest> builder)
    {
        builder.Property(r => r.Prompt).IsRequired();
        builder.Property(r => r.Status).HasConversion<string>().HasMaxLength(32);
        builder.Property(r => r.PromptPayload).HasColumnType("nvarchar(max)");

        builder.HasOne(r => r.Campaign)
            .WithMany(c => c.ContentRequests)
            .HasForeignKey(r => r.CampaignId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(r => r.PromptTemplate)
            .WithMany(t => t.ContentRequests)
            .HasForeignKey(r => r.PromptTemplateId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasIndex(r => r.CampaignId);
        builder.HasIndex(r => r.CreatedAt);
        builder.HasIndex(r => r.Status);
    }
}