using MarketCraftAI.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MarketCraftAI.Infrastructure.Persistence.Configurations;

public class ApprovalConfiguration : IEntityTypeConfiguration<Approval>
{
    public void Configure(EntityTypeBuilder<Approval> builder)
    {
        builder.Property(a => a.Status).HasConversion<string>().HasMaxLength(32);

        builder.HasOne(a => a.GeneratedContent)
            .WithMany(g => g.Approvals)
            .HasForeignKey(a => a.GeneratedContentId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(a => a.Approver)
            .WithMany()
            .HasForeignKey(a => a.ApproverId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(a => a.Status);
        builder.HasIndex(a => a.CreatedAt);
    }
}