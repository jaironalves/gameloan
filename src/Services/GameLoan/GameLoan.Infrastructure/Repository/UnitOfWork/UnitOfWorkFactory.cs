using System;
using GameLoan.Domain.Repository;
using GameLoan.Domain.Repository.UnitOfWork;
using GameLoan.Infrastructure.Repository.Config;

namespace GameLoan.Infrastructure.Repository.UnitOfWork
{
    public class UnitOfWorkFactory : IUnitOfWorkFactory
    {
        private readonly UnitOfWorkFactoryConfig _factoryConfig;

        public UnitOfWorkFactory(UnitOfWorkFactoryConfig factoryConfig)
        {
            _factoryConfig = factoryConfig;
        }

        public IUnitOfWork CreateNew()
        {
            var repositoryConfig = new RepositoryConfig();
            ConfigureRepositories(repositoryConfig);

            return new UnitOfWork(_factoryConfig.Connection, _factoryConfig.SupportTransaction, repositoryConfig);
        }

        private void ConfigureRepositories(RepositoryConfig repositoryConfig)
        {
            repositoryConfig
                .AddBind<IUserRepository, UserRepository>()
                .AddBind<IUserLoginRepository, UserLoginRepository>()
                .AddBind<IFriendRepository, FriendRepository>()
                .AddBind<IGameRepository, GameRepository>();
        }

        public void Dispose()
        {

        }
    }
}