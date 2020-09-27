using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameLoan.Domain.Entities;
using GameLoan.Domain.Repository.UnitOfWork;

namespace GameLoan.Domain.Repository
{   
    public interface IRepository<TEntity, TKey> : IUnitOfWorkRepository, IDisposable where TEntity : BaseEntity<TKey>
    {
        void Add(TEntity obj);
        Task<TEntity> GetByIdAsync(TKey id);
        Task<IEnumerable<TEntity>> GetAllAsync();
        void Update(TEntity obj);
        void Remove(TKey id);
    }
}