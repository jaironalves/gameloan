using Microsoft.Extensions.DependencyInjection;
using GameLoan.Domain.Services;
using GameLoan.Domain.Services.Interfaces;

namespace GameLoan.API.Extensions
{
    public static class DomainServicesExtensions
    {
        public static IServiceCollection AddDomainServices(this IServiceCollection services)
        {
            services.AddScoped<ISessionService, SessionService>();
            services.AddScoped<GameService>();
            services.AddScoped<FriendService>();
            services.AddScoped<LoanService>();
            return services;
        }
    }
}