using System;
using System.Threading.Tasks;
using FluentAssertions;
using GameLoan.API.Controllers;
using GameLoan.API.JwtBearer;
using GameLoan.API.Model;
using GameLoan.Domain.Entities;
using GameLoan.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace GameLoan.UnitTests.API.Controllers
{
    public class SessionControllerTest
    {
        private readonly Mock<ISessionService> _mockISessionService;
        private readonly Mock<IJwtBearerGenerator> _mockIJwtBearerGenerator;
        
        public SessionControllerTest()
        {
            _mockISessionService = new Mock<ISessionService>();
            _mockIJwtBearerGenerator = new Mock<IJwtBearerGenerator>();
        }

        [Fact]
        public async Task AuthenticateShouldReturnJwtBearerToken()
        {
            // Arrange
            var request = new AuthenticateRequest()
            {
                Login = "test",
                Password = "test"
            };

            var userLogin = new UserLogin()
            {
                UserId = Guid.NewGuid(),
                Login = "test",
                Password = "test"             
            };

            var jwt = new JwtBearerToken()
            {
                AccessToken = "your_token",
                Created = DateTime.Now.ToString(),
                Expiration = DateTime.Now.ToString(),
            };

            _mockISessionService.Setup(it => it.GetByLoginAsync(It.IsAny<string>())).
                ReturnsAsync(userLogin);
            _mockISessionService.Setup(it => it.ValidateCredentialsAsync(It.IsAny<UserLogin>(), It.IsAny<string>())).
                ReturnsAsync(true);  
            _mockIJwtBearerGenerator.Setup(it => it.GenerateToken(It.IsAny<UserLogin>(), It.IsAny<string>())).
                Returns(jwt); 

            var controller = new SessionController(_mockISessionService.Object, _mockIJwtBearerGenerator.Object);

            // Act
            var result = await controller.Authenticate(request);    

            // Assert
            result.Should()
                .BeOfType<OkObjectResult>()
                .Which.Value.Should()
                .BeOfType<JwtBearerToken>();
        }

        [Fact]
        public async Task AuthenticateWithoutLoginShouldReturnBadRequest()
        {
            // Arrange
            var request = new AuthenticateRequest()
            {
                Login = "",
                Password = "test"
            };

            var controller = new SessionController(_mockISessionService.Object, _mockIJwtBearerGenerator.Object);

            // Act
            var result = await controller.Authenticate(request);    

            // Assert
            result.Should()
                .BeOfType<BadRequestObjectResult>()
                .Which.Value.Should()
                .BeSameAs("Login obrigatório");
        }
    }
}