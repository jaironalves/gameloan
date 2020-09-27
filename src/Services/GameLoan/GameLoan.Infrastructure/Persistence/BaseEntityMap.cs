using System;
using GameLoan.Domain.Entities;
using MongoDB.Bson.Serialization;

namespace GameLoan.Infrastructure.Persistence
{
    public class BaseEntityMap
    {
        public static void Configure()
        {
            BsonClassMap.RegisterClassMap<BaseEntity<Guid>>(map =>
            {
                map.AutoMap();                
                map.MapIdMember(u => u.Id);
                map.SetIsRootClass(true);
            });
        }
    }
}