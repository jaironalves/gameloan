using System;
using GameLoan.Domain.Entities;

namespace GameLoan.Domain.Repository
{
    public interface IUserRepository : IRepository<User, Guid>
    {
         
    }
}