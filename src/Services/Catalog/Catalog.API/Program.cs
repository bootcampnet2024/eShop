using Catalog.API._02_Infrastructure.Data;
using Catalog.API.Services;
using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

        if (builder.Environment.IsProduction())
        {
            connectionString = builder.Configuration.GetConnectionString("DockerConnection");
        }

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

        builder.Services.AddHealthChecks()
            .AddSqlServer(connectionString);

        builder.Services.AddDbContext<ApplicationDataContext>(options =>
        {
            options.UseSqlServer(
                connectionString,
                x => x.MigrationsHistoryTable("__CatalogMigrationsHistory", "catalog"));
        });

        builder.Services.AddScoped<ICatalogService, CatalogService>();
        builder.Services.AddScoped<ICatalogBrandService, CatalogBrandService>();
        builder.Services.AddScoped<ICatalogItemService, CatalogItemService>();
        builder.Services.AddScoped<ICatalogCategoryService, CatalogCategoryService>();
        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(builder =>
            {
                builder.WithOrigins("http://localhost:4200")
                       .AllowAnyHeader()
                       .AllowAnyMethod();
            });
        });

        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        using (var scope = app.Services.CreateScope())
        {
            var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDataContext>();

            if (dbContext.Database.GetPendingMigrations().Any())
            {
                dbContext.Database.Migrate();
            }
        }

        app.UseAuthorization();
        app.UseCors();
        app.MapControllers();

        app.MapHealthChecks("/health", new HealthCheckOptions()
        {
            Predicate = _ => true,
            ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
        });

        app.Run();
    }
}
