using Microsoft.AspNetCore.Mvc;
using LeftoverFood.API.Data;
using LeftoverFood.API.Models;
using LeftoverFood.API.DTOs;

namespace LeftoverFood.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MealDonationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MealDonationsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> DonateMeals(
            [FromBody] MealDonationDto dto)
        {
            try
            {
                var donation = new MealDonation
                {
                    DonationRequestId = dto.DonationRequestId,
                    MealsDonated = dto.MealsDonated
                };

                _context.MealDonations.Add(donation);

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Meal Donation Successful",
                    donation
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.MealDonations.ToList());
        }
    }
}