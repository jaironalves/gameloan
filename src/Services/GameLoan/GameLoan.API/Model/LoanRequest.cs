using System;

namespace GameLoan.API.Model
{
    public class LoanRequest
    {
        public Guid GameId { get; set; }
        public Guid FriendId { get; set; }
    }
}