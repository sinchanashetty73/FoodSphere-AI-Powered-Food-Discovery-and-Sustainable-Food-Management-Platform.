using Microsoft.AspNetCore.Mvc;
using LeftoverFood.API.Data;
using LeftoverFood.API.Models;

namespace LeftoverFood.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RestaurantsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RestaurantsController(AppDbContext context)
        {
            _context = context;
        }

        // GET ALL RESTAURANTS
        [HttpGet]
        public IActionResult GetRestaurants()
        {
            var restaurants = _context.Restaurants.ToList();

            return Ok(restaurants);
        }
        [HttpPost]
public async Task<IActionResult> AddRestaurant(
    [FromBody] Restaurant restaurant)
{
    _context.Restaurants.Add(restaurant);

    await _context.SaveChangesAsync();

    return Ok(restaurant);
}
[HttpPut("{id}")]
public async Task<IActionResult> UpdateRestaurant(
    int id,
    [FromBody] Restaurant updatedRestaurant)
{
    var restaurant =
        await _context.Restaurants.FindAsync(id);

    if (restaurant == null)
        return NotFound();

    restaurant.Name =
        updatedRestaurant.Name;

    restaurant.Location =
        updatedRestaurant.Location;

    restaurant.ImageUrl =
        updatedRestaurant.ImageUrl;

    restaurant.Rating =
        updatedRestaurant.Rating;

        restaurant.Category =
    updatedRestaurant.Category;

    await _context.SaveChangesAsync();

    return Ok(restaurant);
}

[HttpDelete("{id}")]
public async Task<IActionResult> DeleteRestaurant(int id)
{
    var restaurant =
        await _context.Restaurants.FindAsync(id);

    if (restaurant == null)
        return NotFound();

    _context.Restaurants.Remove(restaurant);

    await _context.SaveChangesAsync();

    return Ok("Restaurant Deleted Successfully");
}
    }
}