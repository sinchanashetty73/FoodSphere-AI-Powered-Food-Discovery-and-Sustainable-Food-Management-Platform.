using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LeftoverFood.API.Data;
using LeftoverFood.API.Models;

namespace LeftoverFood.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeMadeFoodsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public HomeMadeFoodsController(AppDbContext context)
        {
            _context = context;
        }

        // GET ALL FOODS
        [HttpGet]
        public async Task<IActionResult> GetFoods()
        {
            var foods = await _context.HomeMadeFoods.ToListAsync();

            return Ok(foods);
        }

        // ADD FOODS
         [HttpPost]
        public async Task<IActionResult> AddFood(HomeMadeFood food)
        {
            _context.HomeMadeFoods.Add(food);

            await _context.SaveChangesAsync();

            return Ok(food);
        }
        [HttpPut("{id}")]
public async Task<IActionResult> UpdateFood(
    int id,
    [FromBody] HomeMadeFood updatedFood)
{
    var food =
        await _context.HomeMadeFoods.FindAsync(id);

    if (food == null)
        return NotFound();

    food.Name = updatedFood.Name;
    food.ImageUrl = updatedFood.ImageUrl;
    food.Price = updatedFood.Price;
    food.OriginalPrice = updatedFood.OriginalPrice;
    food.Seller = updatedFood.Seller;
    food.Rating = updatedFood.Rating;
    food.Location = updatedFood.Location;
    food.Description = updatedFood.Description;
    food.Category = updatedFood.Category;

    await _context.SaveChangesAsync();

    return Ok(food);
}
   [HttpDelete("{id}")]
public async Task<IActionResult> DeleteFood(int id)
{
    var food =
        await _context.HomeMadeFoods.FindAsync(id);

    if (food == null)
        return NotFound();

    _context.HomeMadeFoods.Remove(food);

    await _context.SaveChangesAsync();

    return Ok("Food Deleted Successfully");
}
        // GET BY CATEGORY
        [HttpGet("category/{category}")]
        public async Task<IActionResult> GetByCategory(string category)
        {
            var foods = await _context.HomeMadeFoods
                .Where(f => f.Category == category)
                .ToListAsync();

            return Ok(foods);
        }

        // SEARCH FOOD
        [HttpGet("search/{term}")]
        public async Task<IActionResult> SearchFood(string term)
        {
            var foods = await _context.HomeMadeFoods
                .Where(f =>
    (f.Name ?? "").ToLower().Contains(term.ToLower()) ||
    (f.Location ?? "").ToLower().Contains(term.ToLower()) ||
    (f.Category ?? "").ToLower().Contains(term.ToLower()))
                .ToListAsync();

            return Ok(foods);
        }
    }
}