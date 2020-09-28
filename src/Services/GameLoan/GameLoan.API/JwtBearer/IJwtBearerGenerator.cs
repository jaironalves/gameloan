using GameLoan.Domain.Entities;

namespace GameLoan.API.JwtBearer
{
    public interface IJwtBearerGenerator
    {
        JwtBearerToken GenerateToken(UserLogin userLogin, string roleType);
    }
}