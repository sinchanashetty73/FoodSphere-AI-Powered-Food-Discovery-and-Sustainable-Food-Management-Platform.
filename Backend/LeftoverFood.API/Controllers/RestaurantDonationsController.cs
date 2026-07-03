using Microsoft.AspNetCore.Mvc;
using LeftoverFood.API.Data;
using LeftoverFood.API.Models;

namespace LeftoverFood.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RestaurantDonationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RestaurantDonationsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
public async Task<IActionResult> Create(
    [FromBody] RestaurantDonation donation)
{
    _context.RestaurantDonations.Add(donation);

    _context.DonationTrackings.Add(
        new DonationTracking
        {
            TrackingId = "FD" +
                Guid.NewGuid()
                .ToString("N")
                .Substring(0, 6)
                .ToUpper(),

            DonationType = "Restaurant",

           RestaurantName = donation.RestaurantName,
PhoneNumber = donation.ContactNumber,

            FoodName = donation.FoodCategory,
            Quantity = donation.Quantity,

            PickupLocation = donation.PickupAddress,

            Destination = "Waiting NGO",
            VolunteerName = "",

            Status = "Submitted",
            UpdatedAt = DateTime.UtcNow
        });

    await _context.SaveChangesAsync();

    return Ok(donation);
}
        
        

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.RestaurantDonations.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var donation =
                _context.RestaurantDonations.FirstOrDefault(x => x.Id == id);

            if (donation == null)
                return NotFound();

            return Ok(donation);
        }
        
    }
}