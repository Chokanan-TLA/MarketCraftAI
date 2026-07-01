using MarketCraftAI.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MarketCraftAI.Infrastructure.Persistence.Configurations;

public class CampaignConfiguration : IEntityTypeConfiguration<Campaign>
{
    public void Configure(EntityTypeBuilder<Campaign> builder)
    {
        builder.Property(c => c.Name).IsRequired().HasMaxLength(256);
        builder.Property(c => c.Status).HasConversion<string>().HasMaxLength(32);

        builder.HasOne(c => c.Owner)
            .WithMany(u => u.Campaigns)
            .HasForeignKey(c => c.OwnerId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(c => c.Status);
        builder.HasIndex(c => c.CreatedAt);
    }
}