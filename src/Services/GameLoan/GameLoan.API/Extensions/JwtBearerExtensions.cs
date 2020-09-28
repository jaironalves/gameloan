using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using Microsoft.AspNetCore.Authorization;
using GameLoan.API.Options;
using GameLoan.API.JwtBearer;

namespace GameLoan.API.Extensions
{
  public static class JwtBearerExtensions
  {
    private static void ConfigureTokenValidationParameters(TokenValidationParameters validationParameters, JwtBearerTokenOptions tokenOptions, SigningOptions signingOptions)
    {
      validationParameters.IssuerSigningKey = signingOptions.SecurityKey;
      validationParameters.ValidAudience = tokenOptions.Audience;
      validationParameters.ValidIssuer = tokenOptions.Issuer;
      validationParameters.ValidateIssuerSigningKey = true;
      validationParameters.ValidateLifetime = true;
      validationParameters.ClockSkew = TimeSpan.Zero;
    }

    public static IServiceCollection AddJwtBearerSecurity(this IServiceCollection services, IConfiguration configuration)
    {
      var tokenOptions = configuration.GetSection(JwtBearerTokenOptions.Section).Get<JwtBearerTokenOptions>();
      var signingOptions = configuration.GetSection(SigningOptions.Section).Get<SigningOptions>();

      services.AddAuthentication(authOptions =>
      {
        authOptions.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        authOptions.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
      })
      .AddJwtBearer(bearerOptions =>
      {
        bearerOptions.RequireHttpsMetadata = false;
        bearerOptions.SaveToken = true;
        ConfigureTokenValidationParameters(bearerOptions.TokenValidationParameters, tokenOptions, signingOptions);
      });

      services.AddAuthorization(auth =>
      {
        auth.AddPolicy(JwtBearerDefaults.AuthenticationScheme, new AuthorizationPolicyBuilder()
                  .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme‌​)
                  .RequireAuthenticatedUser().Build());
      });

      services.AddScoped<IJwtBearerGenerator, JwtBearerGenerator>();

      return services;
    }
  }
}