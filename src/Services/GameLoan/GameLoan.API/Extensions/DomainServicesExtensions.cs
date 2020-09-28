using Microsoft.Extensions.DependencyInjection;
using GameLoan.Domain.Services;

namespace GameLoan.API.Extensions
{
    public static class DomainServicesExtensions
    {
        public static IServiceCollection AddDomainServices(this IServiceCollection services)
        {
            services.AddScoped<SessionService>();
            services.AddScoped<GameService>();
            services.AddScoped<FriendService>();
            services.AddScoped<LoanService>();
            return services;
        }
    }
}