using Catalog.API._02_Infrastructure.Data;
using Catalog.API.Services;
using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.EntityFrameworkCore;
using Polly;
using System.Reflection;

internal class Program
{
    private static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

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

        app.UseAuthorization();
        app.UseCors();
        app.MapControllers();

        app.MapHealthChecks("/health", new HealthCheckOptions()
        {
            Predicate = _ => true,
            ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
        });

        await ExecuteMigrationsPeriodically(app);

        app.Run();
    }

    private static async Task ExecuteMigrationsPeriodically(WebApplication app)
    {
        var retryPolicy = Policy
            .Handle<Exception>()
            .WaitAndRetryForeverAsync(retryAttempt =>
            {
                return TimeSpan.FromMinutes(1);
            });

        await retryPolicy.ExecuteAsync(async () =>
        {
            using var scope = app.Services.CreateScope();

            var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDataContext>();

            var pendingMigrations = await dbContext.Database.GetPendingMigrationsAsync();
            if (pendingMigrations.Any())
            {
                await dbContext.Database.MigrateAsync();
            }
        });
    }
}
