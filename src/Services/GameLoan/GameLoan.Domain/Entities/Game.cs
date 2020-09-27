using System;

namespace GameLoan.Domain.Entities
{
    public class Game : BaseEntity<Guid>
    {      
        public string Name { get; set; }
    }
}