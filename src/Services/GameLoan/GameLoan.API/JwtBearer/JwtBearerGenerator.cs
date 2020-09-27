using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using GameLoan.API.Model;
using GameLoan.API.Options;
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

        public JwtBearerToken GenerateToken(User user, string authenticationType = "Password", string roleType = "Recipient")
        {
            var createdAt = DateTime.Now;
            var expiresAt = createdAt.AddTicks(ExpirationTicks);

            var securityTokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _jwtBearerTokenOptions.Issuer,
                Audience = _jwtBearerTokenOptions.Audience,
                SigningCredentials = _signingOptions.SigningCredentials,
                Subject = GetClaimsIdentity(user.Identifier, authenticationType, roleType),
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

        private ClaimsIdentity GetClaimsIdentity(string identifier, string authenticationType, string roleType)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, identifier),
                new Claim(JwtRegisteredClaimNames.Sub, identifier),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            var claimsIdentity = new ClaimsIdentity(new GenericIdentity(identifier), claims, authenticationType, ClaimTypes.Name, roleType);

            return claimsIdentity;
        }

        private long ExpirationTicks => TimeSpan.FromSeconds(_jwtBearerTokenOptions.Seconds).Ticks;
    }
}