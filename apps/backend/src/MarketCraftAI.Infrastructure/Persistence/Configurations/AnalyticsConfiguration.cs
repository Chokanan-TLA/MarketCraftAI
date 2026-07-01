using MarketCraftAI.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MarketCraftAI.Infrastructure.Persistence.Configurations;

public class AnalyticsConfiguration : IEntityTypeConfiguration<Analytics>
{
    public void Configure(EntityTypeBuilder<Analytics> builder)
    {
        builder.Property(a => a.MetricName).IsRequired().HasMaxLength(128);
        builder.Property(a => a.MetricValue).HasColumnType("decimal(18,4)");
        builder.Property(a => a.Metadata).HasColumnType("nvarchar(max)");

        builder.HasOne(a => a.Campaign)
            .WithMany(c => c.AnalyticsRecords)
            .HasForeignKey(a => a.CampaignId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(a => a.CampaignId);
        builder.HasIndex(a => a.RecordedAt);
    }
}