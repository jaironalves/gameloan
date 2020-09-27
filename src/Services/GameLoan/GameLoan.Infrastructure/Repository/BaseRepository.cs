using System.Collections.Generic;
using System.Threading.Tasks;
using GameLoan.Domain.Entities;
using GameLoan.Domain.Repository;
using GameLoan.Infrastructure.Repository.UnitOfWork;
using MongoDB.Driver;

namespace GameLoan.Infrastructure.Repository
{
    public abstract class BaseRepository<TEntity, TKey> : UnitOfWorkRepository, IRepository<TEntity, TKey> where TEntity : BaseEntity<TKey>
    {
        private IMongoCollection<TEntity> _collection;        

        protected IMongoCollection<TEntity> Collection
        {
            get
            {
                return _collection ??= Context.GetCollection<TEntity>(typeof(TEntity).Name);
            }
        }

        public virtual void Add(TEntity obj)
        {
            Context.AddCommand(() => Collection.InsertOneAsync(obj));
        }

        public async Task<TEntity> GetByIdAsync(TKey id)
        {            
            var data = await Collection.FindAsync(Builders<TEntity>.Filter.Eq("_id", id));
            return data.SingleOrDefault();
        }

        public async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            var all = await Collection.FindAsync(Builders<TEntity>.Filter.Empty);
            return all.ToList();
        }

        public virtual void Update(TEntity obj)
        {            
            Context.AddCommand(() => Collection.ReplaceOneAsync(Builders<TEntity>.Filter.Eq("_id", obj.Id), obj));
        }

        public virtual void Remove(TKey id)
        {           
            Context.AddCommand(() => Collection.DeleteOneAsync(Builders<TEntity>.Filter.Eq("_id", id)));
        }

        public void Dispose()
        {
            Context?.Dispose();
        }
    }
}