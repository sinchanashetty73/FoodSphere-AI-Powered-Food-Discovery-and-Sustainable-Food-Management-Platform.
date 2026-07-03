using Microsoft.AspNetCore.Mvc;
using LeftoverFood.API.Data;
using LeftoverFood.API.Models;
using LeftoverFood.API.DTOs;
using System.Linq;

namespace LeftoverFood.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ REGISTER
        [HttpPost("register")]
        public IActionResult Register(RegisterDto dto)
        {
            // Check if email exists
            var existingUser = _context.Users.FirstOrDefault(u => u.Email == dto.Email);

            if (existingUser != null)
                return BadRequest("Email already exists");

            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = dto.Password
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("User Registered Successfully");
        }

        // ✅ LOGIN
        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = _context.Users
                .FirstOrDefault(u => u.Email == dto.Email && u.Password == dto.Password);

            if (user == null)
                return Unauthorized("Invalid email or password");

            return Ok("Login Successful");
        }
    }
}