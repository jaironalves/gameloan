using System;

namespace GameLoan.Domain.Entities
{
    public class UserLogin
    {
        public Guid UserId { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
    }
}