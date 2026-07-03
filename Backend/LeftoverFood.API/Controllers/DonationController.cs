using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LeftoverFood.API.Data;
using LeftoverFood.API.Models;

namespace LeftoverFood.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DonationController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DonationController(AppDbContext context)
        {
            _context = context;
        }

       [HttpPost]
public async Task<IActionResult> CreateDonation(
    [FromBody] Donation donation)
{
    _context.Donations.Add(donation);

    // CREATE TRACKING RECORD
    var tracking = new DonationTracking
    {
        TrackingId = Guid.NewGuid()
            .ToString("N")
            .Substring(0, 7)
            .ToUpper(),

        DonorName = donation.DonorName,
        PhoneNumber = donation.PhoneNumber,
        Email = donation.Email,

        DonationType = donation.DonationType,
        FoodName = donation.FoodName,
        Quantity = donation.Quantity,

        PickupLocation = donation.PickupAddress,

        Destination = "Waiting NGO",
        VolunteerName = "",
        Status = "Submitted"
    };

    _context.DonationTrackings.Add(tracking);

    await _context.SaveChangesAsync();

    return Ok(donation);
}

        [HttpGet]
        public async Task<IActionResult> GetDonations()
        {
            var donations = await _context.Donations.ToListAsync();
            return Ok(donations);
        }

        [HttpPut("{id}/status")]
public async Task<IActionResult> UpdateStatus(
    int id,
    [FromBody] string status)
{
    var donation =
        await _context.Donations.FindAsync(id);

    if (donation == null)
        return NotFound();

    donation.Status = status;

    donation.LastUpdated =
        DateTime.UtcNow;

    await _context.SaveChangesAsync();

    return Ok(donation);
}

[HttpPut("{id}/assign-volunteer")]
public async Task<IActionResult>
AssignVolunteer(
    int id,
    [FromBody] string volunteerName)
{
    var donation =
        await _context.Donations.FindAsync(id);

    if (donation == null)
        return NotFound();

    donation.VolunteerName =
        volunteerName;

    donation.Status =
        "Volunteer Assigned";

    donation.LastUpdated =
        DateTime.UtcNow;

    await _context.SaveChangesAsync();

    return Ok(donation);
}
    }
}