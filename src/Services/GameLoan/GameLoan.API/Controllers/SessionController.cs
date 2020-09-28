using System.Threading.Tasks;
using GameLoan.API.JwtBearer;
using GameLoan.API.Model;
using GameLoan.Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GameLoan.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class SessionController : ControllerBase
    {
        private SessionService _sessionService;
        private readonly IJwtBearerGenerator _jwtBearerGenerator;

        public SessionController(SessionService sessionService, IJwtBearerGenerator jwtBearerGenerator)
        {
            _sessionService = sessionService;
            _jwtBearerGenerator = jwtBearerGenerator;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<JwtBearerToken>> Authenticate([FromBody] AuthenticateRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Login))
                return BadRequest("Login obrigatório"); 

            if (string.IsNullOrWhiteSpace(request.Password))
                return BadRequest("Senha obrigatória");     

            var userLogin = await _sessionService.GetByLoginAsync(request.Login);

            if ((userLogin is null) && (request.Login == "teste"))
            {
                userLogin = await _sessionService.AddDefaultAsync("Teste", request.Login, request.Login);
            }

            if (userLogin is null)
                return NotFound();

            var isValidCredentials = await _sessionService.ValidateCredentialsAsync(userLogin, request.Password);
            if (!isValidCredentials)
                return BadRequest("Credenciais inválidas");

            return _jwtBearerGenerator.GenerateToken(userLogin, "User");
        }
    }
}