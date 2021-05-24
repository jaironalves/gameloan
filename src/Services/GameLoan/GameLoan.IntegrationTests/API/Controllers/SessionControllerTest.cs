using FluentAssertions;
using GameLoan.API.JwtBearer;
using GameLoan.API.Model;
using GameLoan.IntegrationTests.Fixtures.Integration;
using GameLoan.IntegrationTests.Utils;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace GameLoan.IntegrationTests.API.Controllers
{
    public class SessionControllerTest : IntegrationTestWithDatabase
    {
        [Fact]
        public async Task Authenticate_Must_Return_OK()
        {
            //Arrange
            var request = new AuthenticateRequest()
            {
                Login = "teste",
                Password = "teste"
            };

            var requestJson = Json.Serialize(request);
            var requestStringContent = new StringContent(requestJson, Encoding.UTF8, "application/json");

            httpClient.DefaultRequestHeaders.Clear();
            var requestUri = "api/session";

            //Act
            var response = await httpClient.PostAsync(requestUri, requestStringContent);

            // Assert
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var responseJson = await response.Content.ReadAsStringAsync();
            var jwtBearerTokenResponse = Json.Deserialize<JwtBearerToken>(responseJson);
            jwtBearerTokenResponse.Should().NotBeNull();
        }
    }
}
