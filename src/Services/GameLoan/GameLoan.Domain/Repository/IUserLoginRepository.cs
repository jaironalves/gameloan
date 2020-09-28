using System;
using System.Threading.Tasks;
using GameLoan.Domain.Entities;

namespace GameLoan.Domain.Repository
{
    public interface IUserLoginRepository : IRepository<UserLogin, Guid>
    {
         Task<UserLogin> GetByLoginAsync(string login);
    }
}