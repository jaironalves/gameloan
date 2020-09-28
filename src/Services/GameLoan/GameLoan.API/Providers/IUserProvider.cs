using System;

namespace GameLoan.API.Providers
{
    public interface IUserProvider
    {
        Guid GetUserId();
    }
}