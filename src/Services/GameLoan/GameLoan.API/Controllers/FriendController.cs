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
    public class FriendController : ControllerBase
    {
        private FriendService _friendService;

        public FriendController(FriendService friendService)
        {
            _friendService = friendService;
        }

        [HttpGet]
        public async Task<IEnumerable<Friend>> Get()
        {
            return await _friendService.GetAllAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Game>> Post([FromBody] Friend friend)
        {
            var inserted = await _friendService.AddAsync(friend);
            return CreatedAtRoute("Get", new { id = friend.Id }, friend);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Friend>> Put(Guid id, [FromBody] Friend friend)
        {
            var friendUpdate = await _friendService.GetAsync(id);
            if (friendUpdate is null)
                return NotFound("Amigo não encontrado");

            friendUpdate.Name = friend.Name;

            await _friendService.UpdateAsync(friendUpdate);
            return CreatedAtRoute("Get", new { id = friendUpdate.Id }, friendUpdate);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var friend = await _friendService.GetAsync(id);
            if (friend is null)
                return NotFound("Amigo não encontrado");
            await _friendService.RemoveAsync(friend);
            return NoContent();
        }
    }
}