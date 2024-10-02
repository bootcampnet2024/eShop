using Catalog.API._02_Infrastructure.Data;
using Catalog.API.Services;
using Catalog.API.Services.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);


        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));
        builder.Services.AddHealthChecks();
        builder.Services.AddDbContext<ApplicationDataContext>(options =>
        {
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
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
        app.MapHealthChecks("/health");

        app.Run();
    }
}
