using GameLoan.API.Options;
using GameLoan.Domain.Repository.UnitOfWork;
using GameLoan.Infrastructure.Repository.UnitOfWork;
using GameLoan.IntegrationTests.Fixtures.Factory;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using System.Net.Http;
using Xunit;

namespace GameLoan.IntegrationTests.Fixtures.Integration
{
    class IntegrationTestWithDatabaseFixture { }

    [CollectionDefinition(CollectionDefinitionName)]
    class IntegrationTestWithDatabaseCollection : ICollectionFixture<IntegrationTestWithDatabaseFixture>
    {
        public const string CollectionDefinitionName = nameof(IntegrationTestWithDatabaseCollection);
    }

    [Collection(IntegrationTestWithDatabaseCollection.CollectionDefinitionName)]
    public class IntegrationTestWithDatabase : IDisposable
    {
        private bool disposed = false;

        protected readonly DbFixture dbFixture;
        protected readonly ApiWebApplicationFactory factory;
        protected readonly HttpClient httpClient;

        public IntegrationTestWithDatabase()
        {
            dbFixture = new DbFixture();
            factory = new ApiWebApplicationFactory(ConfigureWebHostBuilder());
            httpClient = factory.CreateClient();
        }

        private Action<IWebHostBuilder> ConfigureWebHostBuilder()
        {
            return (builder) =>
            {
                builder.ConfigureTestServices(services =>
                {
                    //var descriptor = services
                    //    .SingleOrDefault(d => d.ServiceType == typeof(IUnitOfWorkFactory));

                    //services.Remove(descriptor);

                    //var mongoDbOptions = new MongoDbOptions()
                    //{
                    //    Connection = dbFixture.ConnectionString,
                    //    Database = "gameloan-test",
                    //    SupportTransaction = false,
                    //};

                    services.Configure<MongoDbOptions>(opts =>
                    {
                        opts.Connection = dbFixture.Connection;
                        opts.SupportTransaction = false;
                    });

                    //services.AddSingleton<IUnitOfWorkFactory>(provider =>
                    //    new UnitOfWorkFactory(configure =>
                    //    {
                    //        configure.Connection = mongoDbOptions.Connection;
                    //        configure.Database = mongoDbOptions.Database;
                    //    }));

                });
                builder.UseEnvironment("Integration");
            };
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposed)
                return;

            if (disposing)
            {
                dbFixture?.Dispose();
            }

            disposed = true;
        }
    }
}
