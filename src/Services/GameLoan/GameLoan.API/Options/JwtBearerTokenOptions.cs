namespace GameLoan.API.Options
{
  public class JwtBearerTokenOptions
  {
    public const string Section = "Security:JwtBearerToken";
    public string Audience { get; set; }
    public string Issuer { get; set; }
    public string Authority { get; set; }
    public int Seconds { get; set; }
  }
}