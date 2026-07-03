using Microsoft.AspNetCore.Mvc;
using LeftoverFood.API.Data;
using LeftoverFood.API.Models;

namespace LeftoverFood.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReviewsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> AddReview(
            Review review)
        {
            _context.Reviews.Add(review);

            await _context.SaveChangesAsync();

            return Ok(review);
        }

        [HttpGet("{foodId}")]
        public IActionResult GetReviews(int foodId)
        {
            var reviews = _context.Reviews
                .Where(r => r.FoodId == foodId)
                .ToList();

            return Ok(reviews);
        }
    }
}