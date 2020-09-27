using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using GameLoan.API.Options;

namespace GameLoan.API.Extensions
{
    public static class OptionsExtensions
    {
        public static IServiceCollection AddConfigurationOptions(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<MongoDbOptions>(configuration.GetSection(MongoDbOptions.Section));
            services.Configure<JwtBearerTokenOptions>(configuration.GetSection(JwtBearerTokenOptions.Section));
            services.Configure<SigningOptions>(configuration.GetSection(SigningOptions.Section));
            return services;
        }
    }
}