using Microsoft.AspNetCore.Mvc;
using LeftoverFood.API.Data;
using LeftoverFood.API.Models;
using FirebaseAdmin.Messaging;

namespace LeftoverFood.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FcmController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FcmController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("save-token")]
        public async Task<IActionResult> SaveToken([FromBody] FcmToken model)
        {
            if (string.IsNullOrEmpty(model.Token))
            {
                return BadRequest("Token is required");
            }

            var existingToken = _context.FcmTokens
                .FirstOrDefault(x => x.Token == model.Token);

            if (existingToken == null)
            {
                _context.FcmTokens.Add(model);
                await _context.SaveChangesAsync();
            }

            return Ok(new
            {
                message = "FCM token saved successfully"
            });
        }

        [HttpGet("tokens")]
        public IActionResult GetTokens()
        {
            var tokens = _context.FcmTokens.ToList();
            return Ok(tokens);
        }
        [HttpPost("send")]
public async Task<IActionResult> SendNotification()
{
    var tokens = _context.FcmTokens
        .Select(x => x.Token)
        .ToList();

    foreach (var token in tokens)
    {
        var message = new Message()
        {
            Token = token,

            Notification = new Notification()
            {
                Title = "FoodSphere AI",
                Body = "🔥 New Night Deal Available!"
            }
        };

        await FirebaseMessaging.DefaultInstance.SendAsync(message);
    }

    return Ok("Notification Sent");
}
    }
}