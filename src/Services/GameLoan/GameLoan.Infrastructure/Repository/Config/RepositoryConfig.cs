using System;
using System.Collections.Generic;
using GameLoan.Domain.Repository.UnitOfWork;
using GameLoan.Infrastructure.Repository.UnitOfWork;

namespace GameLoan.Infrastructure.Repository.Config
{
    public class RepositoryConfig : IDisposable
    {
        readonly List<RepositoryBinding> _bindings;

        internal RepositoryConfig()
        {
            _bindings = new List<RepositoryBinding>();
        }

        public RepositoryConfig AddBind<TInterface, TConcrete>()
            where TInterface : IUnitOfWorkRepository
            where TConcrete : UnitOfWorkRepository, TInterface
        {
            _bindings.Add(new RepositoryBinding(typeof(TInterface), typeof(TConcrete)));
            return this;
        }

        public bool HasInterfaceBind(Type interfaceBind)
        {
            var Found = false;
            foreach (var item in _bindings)
            {
                Found = interfaceBind == item.InterfaceType;
                if (Found)
                {
                    break;
                }
            }
            return Found;
        }

        public Type GetConcreteBind(Type interfaceBind)
        {
            foreach (var item in _bindings)
            {

                if (interfaceBind == item.InterfaceType)
                {
                    return item.ConcreteType;
                }
            }

            return null;
        }

        #region IDisposable Support
        private bool disposedValue = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    _bindings.Clear();
                }
                disposedValue = true;
            }
        }

        ~RepositoryConfig()
        {
            Dispose(false);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        #endregion
    }
}