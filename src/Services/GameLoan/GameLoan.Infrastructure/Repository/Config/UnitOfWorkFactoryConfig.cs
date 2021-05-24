namespace GameLoan.Infrastructure.Repository.Config
{
    public class UnitOfWorkFactoryConfig
    {
        public string Connection { get; set; }        
        public bool SupportTransaction { get; set; }
    }
}