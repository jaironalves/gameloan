using System;
using System.Threading.Tasks;
using GameLoan.Domain.Entities;
using GameLoan.Domain.Repository;
using GameLoan.Domain.Repository.UnitOfWork;
using GameLoan.Domain.Services.Interfaces;

namespace GameLoan.Domain.Services
{
    public class SessionService : ISessionService
    {
        private readonly IUnitOfWorkFactory _unitOfWorkFactory;

        public SessionService(IUnitOfWorkFactory unitOfWorkFactory)
        {
            _unitOfWorkFactory = unitOfWorkFactory;
        }

        public async Task<UserLogin> GetByLoginAsync(string login)
        {
            using var unitOfWork = _unitOfWorkFactory.CreateNew();
            var userLoginRepository = unitOfWork.Repository<IUserLoginRepository>();
            return await userLoginRepository.GetByLoginAsync(login);
        }

        public async Task<UserLogin> AddAsync(UserLogin userLogin)
        {
            using var unitOfWork = _unitOfWorkFactory.CreateNew();
            var userLoginRepository = unitOfWork.Repository<IUserLoginRepository>();
            userLoginRepository.Add(userLogin);
            await unitOfWork.CommitAsync();
            return userLogin;
        }

        public Task<bool> ValidateCredentialsAsync(UserLogin userLogin, string password)
        {
            return Task.FromResult(BCrypt.Net.BCrypt.Verify(password, userLogin.Password));
        }

        public async Task<UserLogin> AddDefaultAsync(string name, string login, string defaultPassword)
        {
            using var unitOfWork = _unitOfWorkFactory.CreateNew();
            var userRepository = unitOfWork.Repository<IUserRepository>();
            var userLoginRepository = unitOfWork.Repository<IUserLoginRepository>();

            var testUser = new User()
            {
                Id = Guid.NewGuid(),
                Name = name
            };

            var testUserLogin = new UserLogin()
            {
                UserId = testUser.Id,
                Login = login,
                Password = BCrypt.Net.BCrypt.HashPassword(defaultPassword)
            };

            userRepository.Add(testUser);
            userLoginRepository.Add(testUserLogin);

            await unitOfWork.CommitAsync();
            return testUserLogin;
        }

        public async Task<Game> GetAsync(Guid gameId)
        {
            using var unitOfWork = _unitOfWorkFactory.CreateNew();
            var gameRepository = unitOfWork.Repository<IGameRepository>();
            return await gameRepository.GetByKeyAsync(gameId);
        }

        public async Task UpdateAsync(Game game)
        {
            using var unitOfWork = _unitOfWorkFactory.CreateNew();
            var gameRepository = unitOfWork.Repository<IGameRepository>();
            gameRepository.Update(game.Id, game);
            await unitOfWork.CommitAsync();
        }

        public async Task RemoveAsync(Game game)
        {
            using var unitOfWork = _unitOfWorkFactory.CreateNew();
            var gameRepository = unitOfWork.Repository<IGameRepository>();
            gameRepository.Remove(game.Id);
            await unitOfWork.CommitAsync();
        }
    }
}