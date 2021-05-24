using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace GameLoan.API.Options
{
  public class SigningOptions
  {
    public const string Section = "Security:Signing";
    private string _secretKey;
    private SecurityKey _securityKey;
    private SigningCredentials _signingCredentials;

    public string SecretKey
    {
      get => _secretKey;
      set
      {
        _securityKey = null;
        _signingCredentials = null;
        _secretKey = value;
      }
    }

    public SecurityKey SecurityKey
    {
      get => _securityKey ??= new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
    }

    public SigningCredentials SigningCredentials
    {
      get => _signingCredentials ??= new SigningCredentials(SecurityKey, SecurityAlgorithms.HmacSha256);
    }
  }
}