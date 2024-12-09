using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ServiceManagementAPI.Data;
using ServiceManagementAPI.Dtos.Auth;
using ServiceManagementAPI.Models;
using ServiceManagementAPI.Services.Abstract;

namespace ServiceManagementAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly SMContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(SMContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto)
        {

            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == registerDto.Email);
            if (existingUser != null)
                throw new Exception("Email is already in use.");


            var user = new User
            {
                FullName = registerDto.FullName,
                Email = registerDto.Email,
                Password = registerDto.Password,
                UserRoleId = 3
            };


            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();


            user = await _context.Users
                .Include(u => u.UserRole)
                .FirstOrDefaultAsync(u => u.Id == user.Id);


            var token = GenerateJwtToken(user);


            return new AuthResponseDto
            {
                Token = token,
               
            };
        }



        public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto)
        {

            var user = await _context.Users
                .Include(u => u.UserRole)
                .FirstOrDefaultAsync(u => u.Email == loginDto.Email);

            if (user == null)
                throw new Exception("Invalid credentials.");


            if (user.Password != loginDto.Password)
                throw new Exception("Invalid credentials.");


            var token = GenerateJwtToken(user);


            return new AuthResponseDto
            {
                Token = token,
                
            };
        }




        private string GenerateJwtToken(User user)
        {
            if (user == null)
                throw new Exception("User object is null.");

            var claims = new[]
            {
        new Claim("id", user.Id.ToString()),
        new Claim("fullName", user.FullName),
        new Claim("email", user.Email),
        new Claim("role", user.UserRole?.Name)
    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:Issuer"],
                audience: _configuration["JWT:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(7),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


    }
}
