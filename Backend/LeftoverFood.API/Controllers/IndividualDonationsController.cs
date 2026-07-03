using Microsoft.AspNetCore.Mvc;
using LeftoverFood.API.Data;
using LeftoverFood.API.Models;

namespace LeftoverFood.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IndividualDonationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public IndividualDonationsController(AppDbContext context)
        {
            _context = context;
        }

[HttpPost]
public async Task<IActionResult> Create(
    [FromBody] IndividualDonation donation)
{
     _context.IndividualDonations.Add(donation);

        _context.DonationTrackings.Add(
            new DonationTracking
            {
                TrackingId = "FD" +
                    Guid.NewGuid()
                    .ToString("N")
                    .Substring(0, 6)
                    .ToUpper(),

                DonationType = "Individual",
                DonorName = donation.DonorName,
        PhoneNumber = donation.PhoneNumber,
        Email = donation.Email,
                FoodName = donation.FoodName,

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
            return Ok(_context.IndividualDonations.ToList());
        }

        
    }
}