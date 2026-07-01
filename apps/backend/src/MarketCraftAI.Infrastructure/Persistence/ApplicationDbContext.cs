using System.Linq.Expressions;
using MarketCraftAI.Domain.Common;
using MarketCraftAI.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace MarketCraftAI.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Campaign> Campaigns => Set<Campaign>();
    public DbSet<ContentRequest> ContentRequests => Set<ContentRequest>();
    public DbSet<GeneratedContent> GeneratedContents => Set<GeneratedContent>();
    public DbSet<PromptTemplate> PromptTemplates => Set<PromptTemplate>();
    public DbSet<Approval> ApprovalLogs => Set<Approval>();
    public DbSet<Analytics> UsageStatistics => Set<Analytics>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);

        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            if (!typeof(AuditableEntity).IsAssignableFrom(entityType.ClrType))
            {
                continue;
            }

            var parameter = Expression.Parameter(entityType.ClrType, "e");
            var notSoftDeleted = Expression.Lambda(
                Expression.Not(Expression.Property(parameter, nameof(AuditableEntity.SoftDeleted))),
                parameter);

            modelBuilder.Entity(entityType.ClrType).HasQueryFilter(notSoftDeleted);
        }
    }

    public override int SaveChanges()
    {
        ApplyAuditInfo();
        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        ApplyAuditInfo();
        return base.SaveChangesAsync(cancellationToken);
    }

    private void ApplyAuditInfo()
    {
        var utcNow = DateTime.UtcNow;

        foreach (var entry in ChangeTracker.Entries<AuditableEntity>())
        {
            if (entry.State == EntityState.Added)
            {
                entry.Entity.CreatedAt = utcNow;
            }
            else if (entry.State == EntityState.Modified)
            {
                entry.Entity.UpdatedAt = utcNow;
            }
        }
    }
}