using GameLoan.API;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using System;

namespace GameLoan.IntegrationTests.Fixtures.Factory
{
    public class ApiWebApplicationFactory : WebApplicationFactory<Startup>
    {
        private readonly Action<IWebHostBuilder> _configureWebHostBuilder;

        public ApiWebApplicationFactory()
        {
            _configureWebHostBuilder = (builder) =>
            {                
                builder.UseEnvironment("Integration");
            };
        }

        public ApiWebApplicationFactory(Action<IWebHostBuilder> configureWebHostBuilder)
        {
            _configureWebHostBuilder = configureWebHostBuilder;
        }        

        private Action<IWebHostBuilder> WebHostBuilder()
        {
            return (builder) =>
            {
                _configureWebHostBuilder.Invoke(builder);                
            };
        }

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            WebHostBuilder().Invoke(builder);
        }
    }
}
