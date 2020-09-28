using System;

namespace GameLoan.Domain.Entities
{
    public class Game
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid UserId { get; set; }
        public bool Borrowed { get; set; }
    }
}