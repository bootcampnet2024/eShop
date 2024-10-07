using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Ordering.Domain.AggregatesModel.BuyerAggregate;

namespace Ordering.Infrastructure.Data.Configuration;

internal class PaymentMethodsEntityTypeConfiguration : IEntityTypeConfiguration<PaymentMethod>
{
    public void Configure(EntityTypeBuilder<PaymentMethod> builder)
    {
        builder.ToTable("PaymentMethod");

        builder.Ignore(b => b.DomainEvents);

        builder.Property(b => b.Id)
            .UseHiLo("paymentseq");

        builder.Property<int>("BuyerId");

        builder.Property(i => i.Id)
            .ValueGeneratedOnAdd();

        builder.Property("_alias")
            .HasColumnName("Alias")
            .IsRequired()
            .HasMaxLength(50);

        builder.Property("_cardNumber")
            .HasColumnName("CardNumber")
            .IsRequired()
            .HasMaxLength(25);

        builder.Property("_cardHolderName")
            .HasColumnName("CardHolderName")
            .IsRequired()
            .HasMaxLength(20);

        builder.Property("_expiration")
            .HasColumnName("Expiration")
            .IsRequired();

        builder.HasOne(p => p.CardType)
            .WithMany()
            .HasForeignKey("_cardTypeId");
    }
}