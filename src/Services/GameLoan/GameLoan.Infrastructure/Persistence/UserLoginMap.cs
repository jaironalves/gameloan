using GameLoan.Domain.Entities;
using MongoDB.Bson.Serialization;

namespace GameLoan.Infrastructure.Persistence
{
    public class UserLoginMap
    {
        public static void Configure()
        {
            BsonClassMap.RegisterClassMap<UserLogin>(map =>
            {
                map.AutoMap();
                map.SetIgnoreExtraElements(true);
                map.MapIdMember(u => u.UserId);
                map.MapMember(u => u.Login).SetIsRequired(true);
                map.MapMember(u => u.Password).SetIsRequired(true);
            });
        }
    }
}