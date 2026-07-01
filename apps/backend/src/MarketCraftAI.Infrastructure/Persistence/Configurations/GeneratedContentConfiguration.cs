using MarketCraftAI.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MarketCraftAI.Infrastructure.Persistence.Configurations;

public class GeneratedContentConfiguration : IEntityTypeConfiguration<GeneratedContent>
{
    public void Configure(EntityTypeBuilder<GeneratedContent> builder)
    {
        builder.Property(g => g.GeneratedResult).IsRequired().HasColumnType("nvarchar(max)");

        builder.HasOne(g => g.ContentRequest)
            .WithMany(r => r.GeneratedContents)
            .HasForeignKey(g => g.ContentRequestId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(g => g.ContentRequestId);
        builder.HasIndex(g => g.CreatedAt);
    }
}