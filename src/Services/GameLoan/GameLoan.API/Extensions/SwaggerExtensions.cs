using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Reflection;

namespace GameLoan.API.Extensions
{
  public static class SwaggerExtensions
  {
    public static IServiceCollection AddSwaggerOpenApi(this IServiceCollection services)
    {
      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1",
                  new OpenApiInfo
                  {
                    Title = "Game Loan API",
                    Version = "v1",
                    Description = "Game Loan - API",

                  });

        var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
        var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
        c.IncludeXmlComments(xmlPath);
      });
      return services;
    }

    public static void UseSwaggerOpenApi(this IApplicationBuilder app)
    {
      app.UseSwagger();
      app.UseSwaggerUI(c =>
      {
        c.SwaggerEndpoint("./swagger/v1/swagger.json",
                 "Game Loan - API V1");
        c.RoutePrefix = string.Empty;
      });
    }
  }
}
