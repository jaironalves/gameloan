using System;
using System.Threading.Tasks;

namespace GameLoan.Domain.Repository.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
         Task<int> CommitAsync();
         T Repository<T>() where T : class, IUnitOfWorkRepository;
    }
}