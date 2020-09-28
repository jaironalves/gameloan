using Microsoft.Extensions.DependencyInjection;
using GameLoan.API.Providers;

namespace GameLoan.API.Extensions
{
    public static class ProviderExtensions
    {
        public static IServiceCollection AddProviders(this IServiceCollection services)
        {
            services.AddScoped<IUserProvider, UserProvider>();
            return services;
        }
    }
}