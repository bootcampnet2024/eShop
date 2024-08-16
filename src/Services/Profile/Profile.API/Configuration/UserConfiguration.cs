using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Profile.API.Models;

namespace Profile.API.Infrastructure.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            // Definir chave primária
            builder.HasKey(x => x.Id);

            builder.Property(p => p.Email)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(p => p.Number)
                   .IsRequired();

            // Definir propriedades
            builder.Property(p => p.Name)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(p => p.CPF)
                   .IsRequired()
                   .HasMaxLength(11);

            // Definir nome da tabela (opcional)
            builder.ToTable("Users");

            builder.HasData(new User
            {
                Id = Guid.Parse("3fa85f64-5717-4562-b3fc-2c963f66afa6"),
                Name = "Admin User",
                Email = "admin@example.com",
                Number = 123456789,
                CPF = "12345678910"
            });
        }
    }
}
