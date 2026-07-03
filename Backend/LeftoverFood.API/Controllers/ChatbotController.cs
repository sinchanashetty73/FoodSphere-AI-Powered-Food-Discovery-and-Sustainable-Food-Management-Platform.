using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;
using LeftoverFood.API.Models;

namespace LeftoverFood.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatbotController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ChatbotController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("ask")]
        public async Task<IActionResult> Ask([FromBody] ChatRequest request)
        {
            var apiKey = _configuration["Gemini:ApiKey"];

            using var client = new HttpClient();

            var prompt = $@"
You are FoodSpire AI Assistant.

IMPORTANT RULES:

- Never write continuous paragraphs.
- Every section must start on a new line.
- Use this exact format:

🍽 Food Name

📖 Description
• point 1
• point 2

🔥 Popular Types
• item 1
• item 2

🥗 Nutrition
• Calories:
• Protein:

⚠ Allergens
• allergen 1
• allergen 2

⭐ Recommendation
• recommendation

Keep answers short.
Maximum 8-10 lines.
Do not use markdown.
Do not use ** or #.

User Question:
{request.Message}
";

            var body = new
            {
                contents = new[]
                {
                    new
                    {
                        parts = new[]
                        {
                            new { text = prompt }
                        }
                    }
                }
            };

            var json = JsonConvert.SerializeObject(body);

            var response = await client.PostAsync(
                $"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={apiKey}",
                // ",
                new StringContent(json, Encoding.UTF8, "application/json")
            );

            var result = await response.Content.ReadAsStringAsync();

dynamic data = JsonConvert.DeserializeObject(result);

string aiReply =
    data.candidates[0]
        .content.parts[0]
        .text.ToString();

return Ok(new
{
    reply = aiReply
});
        }
    }
}