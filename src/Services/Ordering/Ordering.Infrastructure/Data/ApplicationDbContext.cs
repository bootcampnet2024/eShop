using Microsoft.EntityFrameworkCore;
using Ordering.Domain.AggregatesModel.BuyerAggregate;
using Ordering.Domain.AggregatesModel.OrderAggregate;
using Ordering.Domain.Kernel;
using System.Reflection;

namespace Ordering.Infrastructure.Data;

public class ApplicationDbContext : DbContext, IUnitOfWork
{
    public ApplicationDbContext() : base() { }
    public ApplicationDbContext(DbContextOptions options) : base(options) { }

    public virtual DbSet<PaymentMethod> PaymentMethods { get; set; }
    public virtual DbSet<Buyer> Buyers { get; set; }
    public virtual DbSet<Order> Orders { get; set; }
    public virtual DbSet<OrderItem> Items { get; set; }
    public virtual DbSet<CardType> CardTypes { get; set; }

    public async Task SeedAsync()
    {
        await AddDefaultCardTypes();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("orders");

        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return await base.SaveChangesAsync(cancellationToken);
    }

    public async Task<bool> SaveEntitiesAsync(CancellationToken cancellationToken = default)
    {
        return await SaveChangesAsync(cancellationToken) > 0;
    }

    private async Task AddDefaultCardTypes()
    {
        if (!CardTypes.Any())
            CardTypes.AddRange(Enumeration.GetAll<CardType>());

        await SaveChangesAsync();
    }
}
