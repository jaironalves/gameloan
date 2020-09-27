using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameLoan.Domain.Entities;
using GameLoan.Domain.Repository;
using GameLoan.Domain.Repository.UnitOfWork;

namespace GameLoan.Domain.Services
{
    public class GameService
    {
        private readonly IUnitOfWorkFactory _unitOfWorkFactory;

        public GameService(IUnitOfWorkFactory unitOfWorkFactory)
        {
            _unitOfWorkFactory = unitOfWorkFactory;
        }

        public Task<IEnumerable<Game>> GetAllAsync()
        {
            using var unitOfWork = _unitOfWorkFactory.CreateNew();
            var gameRepository = unitOfWork.Repository<IGameRepository>();
            return gameRepository.GetAllAsync();
        }

        public async Task<Game> AddAsync(Game game)
        {
            using var unitOfWork = _unitOfWorkFactory.CreateNew();
            var gameRepository = unitOfWork.Repository<IGameRepository>();
            game.Id = Guid.NewGuid();
            gameRepository.Add(game);
            await unitOfWork.CommitAsync();
            return game;
        }

        public async Task<Game> GetAsync(Guid gameId)
        {
            using var unitOfWork = _unitOfWorkFactory.CreateNew();
            var gameRepository = unitOfWork.Repository<IGameRepository>();
            return await gameRepository.GetByKeyAsync(gameId);
        }

        public async Task UpdateAsync(Game game)
        {
            using var unitOfWork = _unitOfWorkFactory.CreateNew();
            var gameRepository = unitOfWork.Repository<IGameRepository>();
            gameRepository.Update(game.Id, game);
            await unitOfWork.CommitAsync();
        }

        public async Task RemoveAsync(Game game)
        {
            using var unitOfWork = _unitOfWorkFactory.CreateNew();
            var gameRepository = unitOfWork.Repository<IGameRepository>();
            gameRepository.Remove(game.Id);
            await unitOfWork.CommitAsync();
        }
    }
}