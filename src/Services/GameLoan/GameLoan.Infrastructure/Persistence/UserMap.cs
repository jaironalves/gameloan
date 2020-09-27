using GameLoan.Domain.Entities;
using MongoDB.Bson.Serialization;

namespace GameLoan.Infrastructure.Persistence
{
    public class UserMap
    {
        public static void Configure()
        {
            BsonClassMap.RegisterClassMap<User>(map =>
            {
                map.AutoMap();
                map.SetIgnoreExtraElements(true);
                map.MapIdMember(u => u.Id);
                map.MapMember(u => u.Name).SetIsRequired(true);
            });
        }
    }
}