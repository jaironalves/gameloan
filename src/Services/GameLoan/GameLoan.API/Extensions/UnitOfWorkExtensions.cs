using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using GameLoan.API.Options;
using GameLoan.Domain.Repository.UnitOfWork;
using GameLoan.Infrastructure.Repository.UnitOfWork;

namespace GameLoan.API.Extensions
{
    public static class UnitOfWorkExtensions
    {
        public static IServiceCollection AddUnitOfWork(this IServiceCollection services, IConfiguration configuration)
        {
            var mongoDbOptions = configuration.GetSection(MongoDbOptions.Section).Get<MongoDbOptions>();
            services.AddSingleton<IUnitOfWorkFactory>(provider =>
               new UnitOfWorkFactory(configure =>
               {
                   configure.Connection = mongoDbOptions.Connection;
                   configure.Database = mongoDbOptions.Database;
               }));

            return services;
        }
    }
}