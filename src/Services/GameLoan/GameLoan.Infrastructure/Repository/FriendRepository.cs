using System;
using GameLoan.Domain.Entities;
using GameLoan.Domain.Repository;

namespace GameLoan.Infrastructure.Repository
{
    public class FriendRepository : BaseRepository<Friend, Guid>, IFriendRepository
    {
        
    }
}