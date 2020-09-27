using System;

namespace GameLoan.Domain.Entities
{
    public class User : BaseEntity<Guid>
    {
        public string Name { get; set; }
    }
}