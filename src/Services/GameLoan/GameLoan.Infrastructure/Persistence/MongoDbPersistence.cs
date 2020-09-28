using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Bson.Serialization.Serializers;

namespace GameLoan.Infrastructure.Persistence
{
    internal static class MongoDbPersistence
    {
        internal static void Configure()
        {
            BsonSerializer.RegisterSerializer(new GuidSerializer(GuidRepresentation.CSharpLegacy));

            UserMap.Configure();
            UserLoginMap.Configure();
            GameMap.Configure();

            var pack = new ConventionPack
                {
                    new IgnoreExtraElementsConvention(true),
                    new IgnoreIfDefaultConvention(true)
                };
            ConventionRegistry.Register("Solution Conventions", pack, t => true);
        }
    }
}