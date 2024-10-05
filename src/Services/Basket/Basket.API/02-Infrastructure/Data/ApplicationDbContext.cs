using Basket.API._01_Services.Models;
using Microsoft.EntityFrameworkCore;

namespace Basket.API._02_Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<UserBasket> UserBaskets { get; set; }
        public DbSet<CartItem> CartItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("basket");

            modelBuilder.Entity<UserBasket>()
                .Property(ub => ub.UserId)
                .ValueGeneratedNever();

            modelBuilder.Entity<CartItem>()
                .Property(c => c.Price)
                .HasColumnType("decimal(18,2)");
        }
    }
}
