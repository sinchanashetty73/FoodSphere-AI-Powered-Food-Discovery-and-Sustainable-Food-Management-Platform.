using Microsoft.AspNetCore.Mvc;
using LeftoverFood.API.Data;
using LeftoverFood.API.Models;
using FirebaseAdmin.Messaging;

namespace LeftoverFood.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FoodController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FoodController(AppDbContext context)
        {
            _context = context;
        }

        // GET ALL FOODS
        [HttpGet]
        public IActionResult GetFoods()
        {
            return Ok(_context.FoodItems.ToList());
        }

 [HttpGet("nightdeals")]
public IActionResult GetNightDeals()
{
    return Ok(
        _context.FoodItems
        .Where(x => x.IsNightDeal)
        .ToList()
    );
}

        // ADD FOOD + SEND NOTIFICATION
        [HttpPost]
        public async Task<IActionResult> AddFood(FoodItem food)
        {
             food.IsNightDeal = true;

            _context.FoodItems.Add(food);
            await _context.SaveChangesAsync();

            // Get all saved FCM tokens
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
                        Body = $"🍽️ {food.Name} available now for only ₹{food.Price}. Grab it before it's gone!"
                    }
                };

                try
                {
                    await FirebaseMessaging.DefaultInstance.SendAsync(message);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"FCM Error: {ex.Message}");
                }
            }

            return Ok(food);
        }

        [HttpPut("nightdeals/{id}")]
public async Task<IActionResult> UpdateNightDeal(
int id,
FoodItem food)
{
    var deal = await _context.FoodItems.FindAsync(id);

    if (deal == null)
        return NotFound();

    deal.Name = food.Name;
    deal.ImageUrl = food.ImageUrl;
    deal.Restaurant = food.Restaurant;
    deal.OriginalPrice = food.OriginalPrice;
    deal.DiscountedPrice = food.DiscountedPrice;
    deal.Quantity = food.Quantity;
    deal.Category = food.Category;
    deal.PickupTime = food.PickupTime;
    deal.DealStartTime = food.DealStartTime;
    deal.DealEndTime = food.DealEndTime;

    await _context.SaveChangesAsync();

    return Ok(deal);
}

    // Delete
    [HttpDelete("nightdeals/{id}")]
public async Task<IActionResult> DeleteNightDeal(int id)
{
    var deal = await _context.FoodItems.FindAsync(id);

    if (deal == null)
        return NotFound();

    _context.FoodItems.Remove(deal);

    await _context.SaveChangesAsync();

    return Ok();
}
    }
    
}