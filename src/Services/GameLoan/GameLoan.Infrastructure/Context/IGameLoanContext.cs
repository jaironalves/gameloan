using System;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace GameLoan.Infrastructure.Context
{
    public interface IGameLoanContext : IDisposable
    {
        void AddCommand(Func<Task> func);
        Task<int> SaveChangesAsync();
        IMongoCollection<T> GetCollection<T>(string name);
    }
}