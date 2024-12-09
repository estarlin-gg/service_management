using Microsoft.AspNetCore.Mvc;
using ServiceManagementAPI.Dtos.Auth;
using ServiceManagementAPI.Services.Abstract;
using System.Net;
using System.Threading.Tasks;

namespace ServiceManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
               var authResponse= await _authService.RegisterAsync(registerDto);
                return Ok(new { message = "Usuario registrado correctamente.",credentials =authResponse  });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                var authResponse = await _authService.LoginAsync(loginDto);
                return Ok(authResponse);
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }
    }
}
