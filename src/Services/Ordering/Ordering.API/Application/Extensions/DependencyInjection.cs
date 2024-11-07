using eShop.Library.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Reflection;

namespace Ordering.API.Application.Extensions;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services, IConfiguration configuration, string connectionString)
    {
        services.AddControllers().ConfigureApiBehaviorOptions(options =>
        {
            options.SuppressMapClientErrors = true;
        }); ;
        services.AddEndpointsApiExplorer();
        services.AddMediatR(config => config.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));
        services.AddHttpContextAccessor();
        services.AddHealthChecks().AddSqlServer(connectionString);
        services.AddScoped<IKeycloakService, KeycloakService>();
        services.AddCors(options =>
        {
            options.AddDefaultPolicy(builder =>
            {
                builder.WithOrigins("http://localhost:4200")
                       .AllowAnyHeader()
                       .AllowAnyMethod();
            });
        });
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(o =>
            {
                o.RequireHttpsMetadata = false;
                o.Audience = configuration["Authentication:Audience"];
                o.MetadataAddress = configuration["Authentication:MetadataAddress"]!;
                o.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = configuration["Authentication:ValidIssuer"],
                };
            });

        services.AddSwaggerGen(o =>
        {
            o.AddSecurityDefinition("Keycloak", new OpenApiSecurityScheme
            {
                Type = SecuritySchemeType.OAuth2,
                Flows = new OpenApiOAuthFlows
                {
                    Implicit = new OpenApiOAuthFlow
                    {
                        AuthorizationUrl = new Uri(configuration["Keycloak:AuthorizationUrl"]!),
                        Scopes = new Dictionary<string, string>
                        {
                            { "openid", "openid" }
                        }
                    }
                }
            });
            var securityRequirement = new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Keycloak"
                        },
                        In = ParameterLocation.Header,
                        Name = "Bearer",
                        Scheme = "Bearer"
                    },
                    []
                }
            };
            o.AddSecurityRequirement(securityRequirement);
        });

        return services;
    }
}
