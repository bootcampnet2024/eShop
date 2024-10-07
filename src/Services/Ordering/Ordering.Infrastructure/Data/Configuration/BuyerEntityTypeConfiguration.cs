using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Ordering.Domain.AggregatesModel.BuyerAggregate;

namespace Ordering.Infrastructure.Data.Configuration;

internal class BuyerEntityTypeConfiguration : IEntityTypeConfiguration<Buyer>
{
    public void Configure(EntityTypeBuilder<Buyer> builder)
    {
        builder.ToTable("Buyer");

        builder.Ignore(b => b.DomainEvents);

        builder.Property(i => i.Id)
            .UseHiLo("buyerseq");

        builder.Property(b => b.IdentityGuid)
            .IsRequired();

        builder.HasIndex(b => b.IdentityGuid)
            .IsUnique();

        builder.Property(b => b.Name)
            .IsRequired();

        builder.HasMany(b => b.PaymentMethods)
            .WithOne()
            .HasForeignKey("BuyerId")
            .HasConstraintName("Fk_PaymentMethod_Buyer");
    }
}
