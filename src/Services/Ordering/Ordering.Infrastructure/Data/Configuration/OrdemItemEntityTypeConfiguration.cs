using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Ordering.Domain.AggregatesModel.OrderAggregate;

namespace Ordering.Infrastructure.Data.Configuration;

internal class OrdemItemEntityTypeConfiguration : IEntityTypeConfiguration<OrderItem>
{
    public void Configure(EntityTypeBuilder<OrderItem> builder)
    {
        builder.ToTable("OrderItem", t =>
        {
            t.HasCheckConstraint("CK_Discount_LessThan100", "[Discount] < 100");
            t.HasCheckConstraint("CK_Discount_NonNegative", "[Discount] >= 0");
            t.HasCheckConstraint("CK_Units_NonNegativeOrZero", "[Units] > 0");
        });

        builder.Ignore(i => i.DomainEvents);

        builder.Property(i => i.Id)
            .UseHiLo("orderitemseq");

        builder.Property(i => i.UnitPrice)
               .IsRequired()
               .HasColumnType("decimal(9,2)");

        builder.Property(i => i.Discount)
               .IsRequired()
               .HasColumnType("decimal(4,2)");

        builder.Property(i => i.ProductName)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property<int>("OrderId");
    }
}
