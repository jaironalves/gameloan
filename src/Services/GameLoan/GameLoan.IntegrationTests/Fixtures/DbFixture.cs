using Mongo2Go;
using MongoDB.Driver;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace GameLoan.IntegrationTests.Fixtures
{
    public class DbFixture : IDisposable
    {
        private bool disposed = false;
        private const string DatabaseName = "gameloan-test";

        protected readonly MongoDbRunner mongoDbRunner;

        public string ConnectionString =>
            $"{mongoDbRunner.ConnectionString}{DatabaseName}";

        public string RebuildConnectionString(string connectionOptions) =>
            $"{ConnectionString}?{connectionOptions}";

        public DbFixture()
        {
            //var toolsDirectory = ToolsDirectory();
            //mongoDbRunner = MongoDbRunner.Start(binariesSearchDirectory: toolsDirectory, additionalMongodArguments: "--nojournal");
            mongoDbRunner = MongoDbRunner.Start(additionalMongodArguments: "--nojournal");
        }

        //public string ToolsDirectory()
        //{
        //    var isOsLinux = RuntimeInformation.IsOSPlatform(OSPlatform.Linux);
        //    var isOsWindows = RuntimeInformation.IsOSPlatform(OSPlatform.Windows);

        //    if (!(isOsLinux || isOsWindows))
        //        return null;

        //    var osPlataformString = isOsWindows ? OSPlatform.Windows.ToString() : OSPlatform.Linux.ToString();

        //    var assemblyLocation = Path.GetDirectoryName(GetType().Assembly.Location);
        //    var toolsDirectory = Path.Combine(assemblyLocation, "tools");

        //    var mongoOsFolder = $"mongodb-{osPlataformString.ToLower()}";

        //    var toolsPlataformDirectory = Path.Combine(toolsDirectory, mongoOsFolder);

        //    if (Directory.Exists(toolsPlataformDirectory))
        //        return toolsDirectory;

        //    ExtractMongoBinaries(toolsDirectory, osPlataformString);

        //    return toolsDirectory;
        //}

        //private void ExtractMongoBinaries(string toolsDirectory, string osPlataformString)
        //{
        //    var assemblyLocation = Path.GetDirectoryName(GetType().Assembly.Location);

        //    var zipFilePlataform = Path.Combine(assemblyLocation, $"mongodb-{osPlataformString.ToLower()}.zip");

        //    if (!File.Exists(zipFilePlataform))
        //        throw new FileNotFoundException($"Tools zip {osPlataformString} file not found.");

        //    ZipFile.ExtractToDirectory(zipFilePlataform, toolsDirectory, true);
        //}        

        private Task InsertDocumentAsync<TDocument>(string collectionName, TDocument document) where TDocument : class
        {
            var collection = GetCollection<TDocument>(collectionName);
            return collection.InsertOneAsync(document);
        }

        private async Task<TDocument> GetDocumentAsync<TDocument>(string collectionName, string id) where TDocument : class
        {
            var collection = GetCollection<TDocument>(collectionName);
            var data = await collection.FindAsync(Builders<TDocument>.Filter.Eq("_id", id));
            return data.SingleOrDefault();
        }

        private IMongoCollection<TDocument> GetCollection<TDocument>(string collectionName) where TDocument : class
        {
            var databaseName = MongoUrl.Create(ConnectionString).DatabaseName;

            var client = new MongoClient(ConnectionString);
            var database = client.GetDatabase(databaseName);
            return database.GetCollection<TDocument>(collectionName);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposed)
                return;

            if (disposing)
            {
                mongoDbRunner?.Dispose();
            }

            disposed = true;
        }
    }
}
