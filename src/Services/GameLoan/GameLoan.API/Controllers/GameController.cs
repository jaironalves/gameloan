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

        [HttpPost]
        public async Task<ActionResult> Post([FromBody]Game game)
        {
            var inserted = await _service.AddGameAsync(game);
            return Ok(inserted);
        }
    }
}