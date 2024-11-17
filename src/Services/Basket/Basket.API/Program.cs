using Basket.API._01_Services;
using Basket.API._02_Infrastructure.Data;
using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.EntityFrameworkCore;
using Polly;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddHealthChecks()
            .AddSqlServer(connectionString);

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAll",
                policyBuilder =>
                {
                    policyBuilder.AllowAnyOrigin()
                                 .AllowAnyMethod()
                                 .AllowAnyHeader();
                });
        });

        builder.Services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseSqlServer(
                connectionString,
                x => x.MigrationsHistoryTable("__BasketMigrationsHistory", "basket"));
        });

        builder.Services.AddScoped<IBasketService, BasketService>();


        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseCors("AllowAll");

        app.UseAuthorization();

        app.MapControllers();
        app.MapHealthChecks("/health", new HealthCheckOptions()
        {
            Predicate = _ => true,
            ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
        });

        _ = Task.Run(() => ExecuteMigrationsPeriodically(app));

        app.Run();
    }

    private static async Task ExecuteMigrationsPeriodically(WebApplication app)
    {
        await Task.Delay(TimeSpan.FromSeconds(5));

        var retryPolicy = Policy
            .Handle<Exception>()
            .WaitAndRetryForeverAsync(retryAttempt =>
            {
                return TimeSpan.FromSeconds(5);
            });

        await retryPolicy.ExecuteAsync(async () =>
        {
            using var scope = app.Services.CreateScope();

            var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            var pendingMigrations = await dbContext.Database.GetPendingMigrationsAsync();
            if (pendingMigrations.Any())
            {
                await dbContext.Database.MigrateAsync();
            }
        });
    }
}
