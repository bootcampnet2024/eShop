using Catalog.API._02_Infrastructure.Configurations;
using Management.Domain.Models;
using Management.Infrastructure.Configurations;
using Microsoft.EntityFrameworkCore;

namespace Management.Infrastructure.Data
{
    public class ApplicationDataContext : DbContext
    {
        public ApplicationDataContext(DbContextOptions<ApplicationDataContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ProductEntityConfiguration());
            modelBuilder.ApplyConfiguration(new CatalogBrandEntityConfiguration());
            modelBuilder.ApplyConfiguration(new CatalogCategoryEntityConfiguration());
            base.OnModelCreating(modelBuilder);
        }
    }
}
