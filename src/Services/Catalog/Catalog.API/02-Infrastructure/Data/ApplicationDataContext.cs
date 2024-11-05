using Catalog.API._01_Services.Models;
using Catalog.API._02_Infrastructure.Configurations;
using Microsoft.EntityFrameworkCore;

namespace Catalog.API._02_Infrastructure.Data
{
    public class ApplicationDataContext : DbContext
    {
        public ApplicationDataContext() : base()
        {

        }

        public ApplicationDataContext(DbContextOptions<ApplicationDataContext> options) : base(options)
        {
        }

        public virtual DbSet<CatalogItem> CatalogItems { get; set; }
        public virtual DbSet<CatalogBrand> CatalogBrands { get; set; }
        public virtual DbSet<CatalogCategory> CatalogCategories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("catalog");

            modelBuilder.ApplyConfiguration(new CatalogItemEntityConfiguration());
            modelBuilder.ApplyConfiguration(new CatalogBrandEntityConfiguration());
            modelBuilder.ApplyConfiguration(new CatalogCategoryEntityConfiguration());
        }
    }
}
