using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GameLoan.API.Providers;
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
        private readonly IUserProvider _userProvider;

        public FriendController(FriendService friendService, IUserProvider userProvider)
        {
            _friendService = friendService;
            _userProvider = userProvider;
        }

        [HttpGet]
        public async Task<IEnumerable<Friend>> Get()
        {
            var user = _userProvider.GetUserId();
            return await _friendService.GetAllAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Game>> Post([FromBody] Friend friend)
        {
            friend.UserId = _userProvider.GetUserId();
            
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