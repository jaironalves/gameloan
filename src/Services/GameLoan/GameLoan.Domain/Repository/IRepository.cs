using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameLoan.Domain.Repository.UnitOfWork;

namespace GameLoan.Domain.Repository
{
    public interface IRepository<TEntity, TKey> : IUnitOfWorkRepository, IDisposable where TEntity : class
    {
        void Add(TEntity obj);
        Task<TEntity> GetByKeyAsync(TKey key);
        Task<IEnumerable<TEntity>> GetAllAsync();
        void Update(TKey key, TEntity obj);
        void Remove(TKey key);
    }
}