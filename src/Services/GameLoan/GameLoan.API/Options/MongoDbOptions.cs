namespace GameLoan.API.Options
{
  public class MongoDbOptions
  {
    public const string Section = "MongoDb";
    public string Connection { get; set; }
    public string Database { get; set; }
    public bool SupportTransaction { get; set; }
  }
}