using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Ordering.Domain.AggregatesModel.BuyerAggregate;

namespace Ordering.Infrastructure.Data.Configuration;

public class CardTypeEntityTypeConfiguration : IEntityTypeConfiguration<CardType>
{
    public void Configure(EntityTypeBuilder<CardType> builder)
    {
        builder.ToTable("CardType");

        builder.Property(ct => ct.Id)
            .ValueGeneratedNever();

        builder.Property(ct => ct.Name)
            .HasMaxLength(50)
            .IsRequired();
    }
}
