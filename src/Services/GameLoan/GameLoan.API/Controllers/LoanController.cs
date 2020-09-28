using System;
using System.Threading.Tasks;
using GameLoan.API.Model;
using GameLoan.Domain.Entities;
using GameLoan.Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GameLoan.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class LoanController : ControllerBase
    {
        private LoanService _loanService;

        public LoanController(LoanService loanService)
        {
            _loanService = loanService;
        }

        [HttpPost]
        public async Task<ActionResult<Game>> Post([FromBody] LoanRequest loanRequest)
        {
            var game = await _loanService.GetGameAsync(loanRequest.GameId);
            var friend = await _loanService.GetFriendAsync(loanRequest.FriendId);
            var gameBorrowed = await _loanService.Borrow(game, friend);
            return CreatedAtRoute("Get", new { id = gameBorrowed.Id }, gameBorrowed);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Game>> Put(Guid id)
        {
            var game = await _loanService.GetGameAsync(id);
            var gameGivedBack = await _loanService.GiveBack(game);
            return CreatedAtRoute("Get", new { id = gameGivedBack.Id }, gameGivedBack);
        }
    }
}