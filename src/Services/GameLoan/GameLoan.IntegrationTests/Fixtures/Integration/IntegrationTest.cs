using GameLoan.IntegrationTests.Fixtures.Factory;
using System.Net.Http;

namespace GameLoan.IntegrationTests.Fixtures.Integration
{
    class IntegrationTest
    {
        protected readonly ApiWebApplicationFactory factory;
        protected readonly HttpClient httpClient;

        public IntegrationTest()
        {
            factory = new ApiWebApplicationFactory();
            httpClient = factory.CreateClient();
        }
    }
}
