﻿using Microsoft.EntityFrameworkCore;
using Profile.API.Models;
using Profile.API.Infrastructure.Configuration;

namespace Profile.API.Infrastructure
{
    public class ApplicationDataContext : DbContext
    {
        public ApplicationDataContext(DbContextOptions<ApplicationDataContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserConfiguration());
        }
    }
}
