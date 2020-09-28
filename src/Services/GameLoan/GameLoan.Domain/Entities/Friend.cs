using System;

namespace GameLoan.Domain.Entities
{
    public class Friend
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid UserId { get; set; }
    }
}