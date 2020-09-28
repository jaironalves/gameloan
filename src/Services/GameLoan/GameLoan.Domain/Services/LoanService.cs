using System;
using System.Threading.Tasks;
using GameLoan.Domain.Entities;

namespace GameLoan.Domain.Services
{
    public class LoanService
    {
        private readonly GameService _gameService;
        private readonly FriendService _friendService;

        public LoanService(GameService gameService, FriendService friendService)
        {
            _gameService = gameService;
            _friendService = friendService;
        }

        public Task<Game> GetGameAsync(Guid gameId)
        {
            return _gameService.GetAsync(gameId);
        }

        public Task<Friend> GetFriendAsync(Guid friendId)
        {
            return _friendService.GetAsync(friendId);
        }

        public async Task<Game> Borrow(Game game, Friend friend)
        {
            game.Borrowed = true;
            game.BorrowedTo = friend;
            await _gameService.UpdateAsync(game);
            return game;
        }

        public async Task<Game> GiveBack(Game game)
        {
            game.Borrowed = false;
            game.BorrowedTo = null;
            await _gameService.UpdateAsync(game);
            return game;
        }
    }
}