using System;

namespace GameLoan.Infrastructure.Repository.Config
{
    internal class RepositoryBinding
    {
        public Type InterfaceType { get; private set; }
        public Type ConcreteType { get; private set; }

        public RepositoryBinding(Type interfaceType, Type concreteType)
        {
            InterfaceType = interfaceType;
            ConcreteType = concreteType;
        }
    }
}