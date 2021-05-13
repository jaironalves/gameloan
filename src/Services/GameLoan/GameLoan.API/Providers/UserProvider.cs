using System;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace GameLoan.API.Providers
{
    public class UserProvider : IUserProvider
    {
        private readonly IHttpContextAccessor _context;

        public UserProvider (IHttpContextAccessor context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public Guid GetUserId()
        {
            var claim = _context.HttpContext.User.Claims
                       .First(cl => cl.Type == ClaimTypes.NameIdentifier);
            return Guid.Parse(claim.Value);
        }
    }
}