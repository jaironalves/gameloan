using GameLoan.Infrastructure.Persistence;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameLoan.Infrastructure.Context
{
    public class GameLoanContext : IGameLoanContext
    {
        private IClientSessionHandle Session { get; set; }

        private readonly IList<Func<Task>> _commands;
        private readonly string _connection;        
        private readonly bool _supportTransaction;
        private MongoClient _mongoClient;
        private IMongoDatabase _mongoDatabase;

        public GameLoanContext(string connection, bool supportTransaction)
        {
            _connection = connection;            
            _supportTransaction = supportTransaction;
            _commands = new List<Func<Task>>();
        }

        static GameLoanContext()
        {
            MongoDbPersistence.Configure();
        }

        private MongoClient MongoClient
        {
            get => _mongoClient ??= new MongoClient(_connection);
        }

        private IMongoDatabase MongoDatabase
        {
            get => _mongoDatabase ??= GetMongoDatabase();
        }

        private IMongoDatabase GetMongoDatabase()
        {
            var databaseName = MongoUrl.Create(_connection).DatabaseName;
            return MongoClient.GetDatabase(databaseName);
        }

        private async Task SaveChangesWithTransactionAsync()
        {
            using (Session = await MongoClient.StartSessionAsync())
            {
                Session.StartTransaction();

                var commandTasks = _commands.Select(c => c());

                await Task.WhenAll(commandTasks);

                await Session.CommitTransactionAsync();
            }
        }

        private async Task SaveChangesWithoutTransactionAsync()
        {
            var commandTasks = _commands.Select(c => c());
            await Task.WhenAll(commandTasks);
        }

        public async Task<int> SaveChangesAsync()
        {
            if (_supportTransaction)
                await SaveChangesWithTransactionAsync();
            else
                await SaveChangesWithoutTransactionAsync();

            return _commands.Count;
        }

        public IMongoCollection<T> GetCollection<T>(string name)
        {
            return MongoDatabase.GetCollection<T>(name);
        }

        public void Dispose()
        {
            Session?.Dispose();
            GC.SuppressFinalize(this);
        }

        public void AddCommand(Func<Task> func)
        {
            _commands.Add(func);
        }
    }
}