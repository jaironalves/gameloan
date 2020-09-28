using GameLoan.Domain.Entities;
using MongoDB.Bson.Serialization;

namespace GameLoan.Infrastructure.Persistence
{
    public class FriendMap
    {
        public static void Configure()
        {
            BsonClassMap.RegisterClassMap<Friend>(map =>
            {
                map.AutoMap();
                map.SetIgnoreExtraElements(true);
                map.MapIdMember(member => member.Id);
                map.MapMember(member => member.Name).SetIsRequired(true);
                map.MapMember(member => member.UserId).SetIsRequired(true);                
            });
        }
    }
}