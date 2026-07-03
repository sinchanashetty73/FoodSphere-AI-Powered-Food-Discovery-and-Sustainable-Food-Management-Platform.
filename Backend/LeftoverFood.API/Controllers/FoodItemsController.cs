using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LeftoverFood.API.Data;
using LeftoverFood.API.Models;

namespace LeftoverFood.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FoodItemsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FoodItemsController(AppDbContext context)
        {
            _context = context;
        }


        // GET ALL FOOD ITEMS FOR ADMIN
       [HttpGet]
public IActionResult GetAllFoods()
{
    var foods = _context.FoodItems
        .Select(f => new
        {
            f.Id,
            f.Name,
            f.Price,
            f.ImageUrl,
            f.RestaurantId,

            RestaurantName = _context.Restaurants
                .Where(r => r.Id == f.RestaurantId)
                .Select(r => r.Name)
                .FirstOrDefault()
        })
        .ToList();

    return Ok(foods);
}


        // GET FOOD BY RESTAURANT
        [HttpGet("restaurant/{restaurantId}")]
        public IActionResult GetFoodsByRestaurant(int restaurantId)
        {
            var foods = _context.FoodItems
                .Where(f => f.RestaurantId == restaurantId)
                .ToList();

            return Ok(foods);
        }


        // ADD FOOD
        [HttpPost]
        public async Task<IActionResult> AddFood(FoodItem food)
        {
            _context.FoodItems.Add(food);

            await _context.SaveChangesAsync();

            return Ok(food);
        }


        // DELETE FOOD
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFood(int id)
        {
            var food = await _context.FoodItems.FindAsync(id);

            if(food == null)
            {
                return NotFound();
            }

            _context.FoodItems.Remove(food);

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}