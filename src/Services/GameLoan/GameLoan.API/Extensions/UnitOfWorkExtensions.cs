using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using GameLoan.API.Options;
using GameLoan.Domain.Repository.UnitOfWork;
using GameLoan.Infrastructure.Repository.UnitOfWork;
using GameLoan.Infrastructure.Repository.Config;
using Microsoft.Extensions.Options;

namespace GameLoan.API.Extensions
{
    public static class UnitOfWorkExtensions
    {
        public static IServiceCollection AddUnitOfWork(this IServiceCollection services, IConfiguration configuration)
        {            
            services.AddSingleton(provider =>
            {
                var mongoDbOptions = provider.GetRequiredService<IOptions<MongoDbOptions>>().Value;
                return new UnitOfWorkFactoryConfig()
                {
                    Connection = mongoDbOptions.Connection,                    
                    SupportTransaction = mongoDbOptions.SupportTransaction
                };
            });

            services.AddSingleton<IUnitOfWorkFactory, UnitOfWorkFactory>();

            return services;
        }
    }
}