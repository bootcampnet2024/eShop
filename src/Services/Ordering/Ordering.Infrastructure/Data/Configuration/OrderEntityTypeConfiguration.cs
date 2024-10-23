using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Ordering.Domain.AggregatesModel.OrderAggregate;

namespace Ordering.Infrastructure.Data.Configuration;

internal class OrderEntityTypeConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.ToTable("Order");

        builder.Ignore(o => o.DomainEvents);

        builder.Property(o => o.Id)
            .UseHiLo("orderseq");

        builder.Property(o => o.OrderDate)
            .ValueGeneratedOnAdd()
            .HasDefaultValueSql("GETUTCDATE()");

        builder.Property(o => o.OrderStatus)
            .HasConversion<string>();

        builder.Property(o => o.Description)
            .IsRequired(false);

        builder.HasOne(o => o.Buyer)
            .WithMany()
            .HasForeignKey(o => o.BuyerId);

        builder.OwnsOne(o => o.Address, a =>
        {
            a.Property(p => p.Street).HasColumnName("Street");
            a.Property(p => p.City).HasColumnName("City");
            a.Property(p => p.State).HasColumnName("State");
            a.Property(p => p.Country).HasColumnName("Country");
            a.Property(p => p.ZipCode).HasColumnName("ZipCode");
        });

        builder.HasMany(o => o.OrderItems)
            .WithOne()
            .HasForeignKey("OrderId")
            .HasConstraintName("Fk_Order_OrderItem");
    }
}
