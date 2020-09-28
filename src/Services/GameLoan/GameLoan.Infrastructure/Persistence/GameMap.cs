using GameLoan.Domain.Entities;
using MongoDB.Bson.Serialization;

namespace GameLoan.Infrastructure.Persistence
{
    public class GameMap
    {
        public static void Configure()
        {
            BsonClassMap.RegisterClassMap<Game>(map =>
            {
                map.AutoMap();
                map.SetIgnoreExtraElements(true);
                map.MapIdMember(member => member.Id);
                map.MapMember(member => member.Name).SetIsRequired(true);                
                map.MapMember(member => member.Borrowed).SetIsRequired(true);
            });
        }
    }
}