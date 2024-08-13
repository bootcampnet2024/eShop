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
                   .IsRequired()
                   .HasMaxLength(255);

            // Definir propriedades
            builder.Property(p => p.Name)
                   .IsRequired()
                   .HasMaxLength(100);


            // Definir nome da tabela (opcional)
            builder.ToTable("Users");
        }
    }
}
