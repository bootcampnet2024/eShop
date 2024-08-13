using Management.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Management.Infrastructure.Configurations
{
    public class ProductEntityConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
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

            builder.Property(e => e.Quantity)
                .IsRequired();

            builder.Property(e => e.Price)
                .IsRequired()
                .HasColumnType("decimal(9,2)");

            builder.Property(e => e.ImageURL)
                .IsRequired();

            builder.Property(e => e.IsActive)
                .IsRequired();

            builder.HasOne(e => e.Brand)
                .WithMany()
                .HasForeignKey("BrandId")
                .HasConstraintName("FK_Product_Brand");

            builder.HasOne(e => e.Category)
                .WithMany()
                .HasForeignKey("CategoryId")
                .HasConstraintName("FK_Product_Category");
        }
    }
}
