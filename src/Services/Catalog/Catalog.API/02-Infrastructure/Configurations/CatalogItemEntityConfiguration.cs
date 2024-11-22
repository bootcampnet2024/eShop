using Catalog.API._01_Services.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Catalog.API._02_Infrastructure.Configurations
{
    public class CatalogItemEntityConfiguration : IEntityTypeConfiguration<CatalogItem>
    {
        public void Configure(EntityTypeBuilder<CatalogItem> builder)
        {
            builder.ToTable("Product", t =>
            {
                t.HasCheckConstraint("CK_Product_Discount", "[Discount] BETWEEN 0 AND 100");
            });

            builder.Property(e => e.Id)
                .ValueGeneratedOnAdd();

            builder.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(e => e.Description)
                .IsRequired()
                .HasMaxLength(500);

            builder.Property(e => e.Price)
                .IsRequired()
                .HasColumnType("decimal(9,2)");

            builder.Property(e => e.Discount)
                .HasDefaultValue(0);

            builder.Property(e => e.IsHighlighted)
                .IsRequired();

            builder.Property(e => e.Quantity)
                .IsRequired();

            builder.HasOne(p => p.Brand)
                .WithMany()
                .HasForeignKey("BrandId")
                .HasConstraintName("FK_Product_CatalogBrand");

            builder.HasOne(p => p.Category)
                .WithMany()
                .HasForeignKey("CategoryId")
                .HasConstraintName("FK_Product_CatalogCategory");
        }
    }
}