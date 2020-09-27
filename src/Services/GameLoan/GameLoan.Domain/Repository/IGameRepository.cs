using System;
using GameLoan.Domain.Entities;

namespace GameLoan.Domain.Repository
{
    public interface IGameRepository : IRepository<Game, Guid>
    {
         
    }
}