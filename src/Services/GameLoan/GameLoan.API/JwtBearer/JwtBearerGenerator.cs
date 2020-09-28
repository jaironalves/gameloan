using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using GameLoan.API.Model;
using GameLoan.API.Options;
using GameLoan.Domain.Entities;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace GameLoan.API.JwtBearer
{
    public class JwtBearerGenerator : IJwtBearerGenerator
    {
        private readonly JwtBearerTokenOptions _jwtBearerTokenOptions;
        private readonly SigningOptions _signingOptions;

        public JwtBearerGenerator(IOptions<JwtBearerTokenOptions> jwtBearerTokenOptions, IOptions<SigningOptions> signingOptions)
        {
            _jwtBearerTokenOptions = jwtBearerTokenOptions.Value;
            _signingOptions = signingOptions.Value;
        }

        public JwtBearerToken GenerateToken(UserLogin userLogin, string roleType = "User")
        {
            var createdAt = DateTime.Now;
            var expiresAt = createdAt.AddTicks(ExpirationTicks);

            var securityTokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _jwtBearerTokenOptions.Issuer,
                Audience = _jwtBearerTokenOptions.Audience,
                SigningCredentials = _signingOptions.SigningCredentials,
                Subject = GetClaimsIdentity(userLogin, roleType),
                IssuedAt = createdAt,
                NotBefore = createdAt,
                Expires = expiresAt,
            };
            var jwtHandler = new JwtSecurityTokenHandler();
            var securityToken = jwtHandler.CreateJwtSecurityToken(securityTokenDescriptor);
            var accessToken = jwtHandler.WriteToken(securityToken);

            return new JwtBearerToken()
            {
                Created = createdAt.ToString("yyyy-MM-dd HH:mm:ss"),
                Expiration = expiresAt.ToString("yyyy-MM-dd HH:mm:ss"),
                AccessToken = accessToken,
            };
        }

        private ClaimsIdentity GetClaimsIdentity(UserLogin userLogin, string roleType)
        {
            var claims = new List<Claim>()
            {                            
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
                new Claim(JwtRegisteredClaimNames.UniqueName, userLogin.Login),
                new Claim(ClaimTypes.NameIdentifier, userLogin.UserId.ToString()),
            };

            var claimsIdentity = new ClaimsIdentity(new GenericIdentity(userLogin.Login), claims, "Password", ClaimTypes.Name, roleType);
            return claimsIdentity;
        }

        private long ExpirationTicks => TimeSpan.FromSeconds(_jwtBearerTokenOptions.Seconds).Ticks;
    }
}