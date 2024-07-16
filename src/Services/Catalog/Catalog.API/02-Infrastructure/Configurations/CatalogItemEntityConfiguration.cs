using Catalog.API.Services.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Catalog.API._02_Infrastructure.Configurations
{
    public class CatalogItemEntityConfiguration : IEntityTypeConfiguration<CatalogItem>
    {
        public void Configure(EntityTypeBuilder<CatalogItem> builder)
        {
            builder.ToTable("Product");

            builder.Property(e => e.Id)
                .ValueGeneratedOnAdd();

            builder.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(e => e.Description)
                .IsRequired()
                .HasMaxLength(300);

            builder.Property(e => e.Price)
                .IsRequired()
                .HasColumnType("decimal(9,2)");

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