using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Ordering.Domain.AggregatesModel.BuyerAggregate;

namespace Ordering.Infrastructure.Data.Configuration;

internal class PaymentMethodsEntityTypeConfiguration : IEntityTypeConfiguration<PaymentMethod>
{
    public void Configure(EntityTypeBuilder<PaymentMethod> builder)
    {
        builder.ToTable("PaymentMethod");

        builder.Property(i => i.Id)
            .ValueGeneratedOnAdd();

        builder.Property(p => p.Alias)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(p => p.CardNumber)
            .IsRequired()
            .HasMaxLength(25);

        builder.Property(p => p.SecurityNumber)
            .HasMaxLength(4);

        builder.Property(p => p.CardHolderName)
            .IsRequired()
            .HasMaxLength(20);
    }
}