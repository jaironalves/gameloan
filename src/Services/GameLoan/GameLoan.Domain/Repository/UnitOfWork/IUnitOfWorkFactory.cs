using System;

namespace GameLoan.Domain.Repository.UnitOfWork
{
    public interface IUnitOfWorkFactory : IDisposable
    {
         IUnitOfWork CreateNew();
    }
}