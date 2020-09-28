using System;
using System.Threading.Tasks;
using GameLoan.Domain.Entities;
using GameLoan.Domain.Repository;
using MongoDB.Driver;

namespace GameLoan.Infrastructure.Repository
{
    public class UserLoginRepository : BaseRepository<UserLogin, Guid>, IUserLoginRepository
    {
        public async Task<UserLogin> GetByLoginAsync(string login)
        {
            var data = await Collection.FindAsync(Builders<UserLogin>.Filter.Eq(ul => ul.Login, login));
            return data.SingleOrDefault();
        }
    }
}