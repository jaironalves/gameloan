using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameLoan.Domain.Entities;
using GameLoan.Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GameLoan.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class GameController : ControllerBase
    {
        private GameService _gameService;

        public GameController(GameService gameService)
        {
            _gameService = gameService;
        }

        [HttpGet]
        public async Task<IEnumerable<Game>> Get()
        {
            return await _gameService.GetAllAsync();
        }

        [HttpGet("{id}", Name = "Get")]
        public async Task<ActionResult<Game>> Get(Guid id)
        {
            var game = await _gameService.GetAsync(id);

            if (game is null)
                return NotFound("Jogo não encontrado");

            return game;
        }

        [HttpPost]
        public async Task<ActionResult<Game>> Post([FromBody] Game game)
        {
            game.Borrowed = false;
            var inserted = await _gameService.AddAsync(game);
            return CreatedAtRoute("Get", new { id = game.Id }, game);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Game>> Put(Guid id, [FromBody] Game game)
        {
            var gameUpdate = await _gameService.GetAsync(id);
            if (gameUpdate is null)
                return NotFound("Jogo não encontrado");

            gameUpdate.Name = game.Name;

            await _gameService.UpdateAsync(gameUpdate);
            return CreatedAtRoute("Get", new { id = gameUpdate.Id }, gameUpdate);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var game = await _gameService.GetAsync(id);
            if (game is null)
                return NotFound("Jogo não encontrado");
            await _gameService.RemoveAsync(game);
            return NoContent();
        }
    }
}