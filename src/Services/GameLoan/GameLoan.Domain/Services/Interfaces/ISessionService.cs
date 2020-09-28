using System;
using System.Threading.Tasks;
using GameLoan.Domain.Entities;

namespace GameLoan.Domain.Services.Interfaces
{
    public interface ISessionService
    {
        Task<UserLogin> AddAsync(UserLogin userLogin);
        Task<UserLogin> AddDefaultAsync(string name, string login, string defaultPassword);
        Task<Game> GetAsync(Guid gameId);
        Task<UserLogin> GetByLoginAsync(string login);
        Task RemoveAsync(Game game);
        Task UpdateAsync(Game game);
        Task<bool> ValidateCredentialsAsync(UserLogin userLogin, string password);
    }
}