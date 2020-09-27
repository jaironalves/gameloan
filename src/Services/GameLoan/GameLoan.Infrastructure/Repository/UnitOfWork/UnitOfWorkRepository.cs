using GameLoan.Infrastructure.Context;

namespace GameLoan.Infrastructure.Repository.UnitOfWork
{
    public class UnitOfWorkRepository
    {
        protected IGameLoanContext Context { get; private set; }    

        internal void SetUnitOfWorkContext(IGameLoanContext context)
        {   
            Context = context;
        }
    }
}