using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Profile.API.Models;
using Profile.API.Infrastructure.Configuration; 
 

namespace Profile.API.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DataBase");

            // Configuração do DbContext

            services.AddDbContext<ApplicationDataContext>(options =>
                options.UseSqlServer(connectionString));

            // Registro dos repositórios

            services.AddScoped<IUserRepository, UserRepository>();


            return services;
        }
    }
}
