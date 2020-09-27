using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameLoan.Domain.Entities;
using GameLoan.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace GameLoan.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GameController : ControllerBase
    {
        private GameService _service;

        public GameController(GameService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IEnumerable<Game>> Get()
        {
            return await _service.GetAllAsync();
        }

        [HttpGet("{id}", Name = "Get")]
        public async Task<ActionResult<Game>> Get(Guid id)
        {
            var game = await _service.GetAsync(id);

            if (game is null)
                return NotFound("Jogo não encontrado");

            return game;
        }

        [HttpPost]
        public async Task<ActionResult<Game>> Post([FromBody] Game game)
        {
            var inserted = await _service.AddAsync(game);
            return CreatedAtRoute("Get", new { id = game.Id }, game);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Game>> Put(Guid id, [FromBody] Game game)
        {
            var gameUpdate = await _service.GetAsync(id);
            if (gameUpdate is null)
                return NotFound("Jogo não encontrado");

            gameUpdate.Name = game.Name;

            await _service.UpdateAsync(gameUpdate);
            return CreatedAtRoute("Get", new { id = gameUpdate.Id }, gameUpdate);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var game = await _service.GetAsync(id);
            if (game is null)
                return NotFound("Jogo não encontrado");
            await _service.RemoveAsync(game);
            return NoContent();
        }
    }
}