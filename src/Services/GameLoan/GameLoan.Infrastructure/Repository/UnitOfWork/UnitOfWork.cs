using System;
using System.Threading.Tasks;
using GameLoan.Domain.Repository.UnitOfWork;
using GameLoan.Infrastructure.Context;
using GameLoan.Infrastructure.Repository.Config;

namespace GameLoan.Infrastructure.Repository.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly string _contextConnection;
        private readonly string _contextDatabase;
        private readonly bool _contextSupportTransaction;
        private readonly RepositoryConfig _repositoryConfig;
        private IGameLoanContext _context;

        public UnitOfWork(string contextConnection, string contextDatabase, bool contextSupportTransaction, RepositoryConfig repositoryConfig)
        {
            _contextConnection = contextConnection;
            _contextDatabase = contextDatabase;
            _contextSupportTransaction = contextSupportTransaction;
            _repositoryConfig = repositoryConfig;
        }

        private IGameLoanContext Context
        {
            get
            {
                return _context ??= new GameLoanContext(_contextConnection, _contextDatabase, _contextSupportTransaction);
            }
        }

        public async Task<int> CommitAsync()
        {
            var changeAmount = await Context.SaveChangesAsync();
            return changeAmount;
        }

        public T Repository<T>() where T : class, IUnitOfWorkRepository
        {
            Type typeT = typeof(T);

            Type typeRepositorio = null;

            if (typeT.IsGenericType)
            {
                Type typeRepositorioGeneric = typeof(BaseRepository<,>);
                typeRepositorio = typeRepositorioGeneric.MakeGenericType(typeT.GetGenericArguments());
            }

            if ((_repositoryConfig != null) && (_repositoryConfig.HasInterfaceBind(typeT)))
            {
                typeRepositorio = _repositoryConfig.GetConcreteBind(typeT);
            }

            if (typeRepositorio == null)
                throw new ArgumentNullException(typeof(T).ToString() + " not implements bind");

            if (!typeRepositorio.IsSubclassOf(typeof(UnitOfWorkRepository)))
                throw new NotSupportedException(typeRepositorio.ToString() + " not implements " + typeof(UnitOfWorkRepository).ToString());

            var repositorio = Activator.CreateInstance(typeRepositorio);
            ((UnitOfWorkRepository)repositorio).SetUnitOfWorkContext(Context);

            return (T)repositorio;
        }

        public void Dispose()
        {
            Context?.Dispose();
        }
    }
}