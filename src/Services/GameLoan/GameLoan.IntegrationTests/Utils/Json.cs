using System.Text.Json;
using System.Text.Json.Serialization;

namespace GameLoan.IntegrationTests.Utils
{
    class Json
    {
        public static string Serialize<TValue>(TValue value)
        {
            var options = new JsonSerializerOptions();
            options.Converters.Add(new JsonStringEnumConverter(allowIntegerValues: false));
            return JsonSerializer.Serialize(value, options);
        }

        public static TValue Deserialize<TValue>(string json)
        {
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            options.Converters.Add(new JsonStringEnumConverter(allowIntegerValues: false));
            return JsonSerializer.Deserialize<TValue>(json, options);
        }
    }
}
