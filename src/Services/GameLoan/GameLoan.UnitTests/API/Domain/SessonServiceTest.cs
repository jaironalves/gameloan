using System;
using System.Threading.Tasks;
using FluentAssertions;
using GameLoan.Domain.Entities;
using GameLoan.Domain.Repository;
using GameLoan.Domain.Repository.UnitOfWork;
using GameLoan.Domain.Services;
using Moq;
using Xunit;

namespace GameLoan.UnitTests.API.Domain
{
    public class SessonServiceTest
    {
        private readonly Mock<IUnitOfWorkFactory> _mockIUnitOfWorkFactory;
        public SessonServiceTest()
        {
            _mockIUnitOfWorkFactory = new Mock<IUnitOfWorkFactory>();
        }

        [Fact]
        public async Task GetByLoginAsyncShouldReturnUserLogin()
        {
            // Arrange
            var userLogin = new UserLogin()
            {
                UserId = Guid.NewGuid(),
                Login = "test",
                Password = "test"             
            };

            var _mockIUnitOfWork = new Mock<IUnitOfWork>();
            var _mockIUserLoginRepository = new Mock<IUserLoginRepository>();            

            _mockIUserLoginRepository.Setup(it => it.GetByLoginAsync(It.IsAny<string>()))
                .ReturnsAsync(userLogin);

            _mockIUnitOfWork.Setup(it => it.Repository<IUserLoginRepository>())
                .Returns(_mockIUserLoginRepository.Object);

            _mockIUnitOfWorkFactory.Setup(it => it.CreateNew()).
                Returns(_mockIUnitOfWork.Object);

            var sessionService = new SessionService(_mockIUnitOfWorkFactory.Object);

            // Act
            var result = await sessionService.GetByLoginAsync(userLogin.Login);    

            // Assert
            result.Should()
                .BeOfType<UserLogin>()
                .Which.Should()
                .BeSameAs(userLogin);
        }
    }
}