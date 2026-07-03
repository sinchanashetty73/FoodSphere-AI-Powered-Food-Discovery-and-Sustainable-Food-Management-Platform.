using Microsoft.AspNetCore.Mvc;
using LeftoverFood.API.Data;
using LeftoverFood.API.Models;
using Microsoft.EntityFrameworkCore;

namespace LeftoverFood.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DonationTrackingController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DonationTrackingController(AppDbContext context)
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
        public IActionResult GetAll()
        {
            var data = _context.DonationTrackings
                .OrderByDescending(x => x.UpdatedAt)
                .ToList();

            return Ok(data);
        }
        [HttpPut("{id}/status")]
public async Task<IActionResult> UpdateStatus(
    int id,
    [FromBody] string status)
{
    var donation = await _context.DonationTrackings
        .FindAsync(id);

    if (donation == null)
        return NotFound();

    donation.Status = status;
    donation.UpdatedAt = DateTime.UtcNow;

    await _context.SaveChangesAsync();

    return Ok(donation);
}
[HttpPut("{id}/assign-volunteer")]
public async Task<IActionResult>
AssignVolunteer(
    int id,
    [FromBody] Volunteer volunteer)
{
    var donation =
        await _context.DonationTrackings
            .FindAsync(id);

    if (donation == null)
        return NotFound();

    donation.VolunteerName =
        volunteer.Name;

    donation.VolunteerPhone =
        volunteer.PhoneNumber;

    donation.VolunteerAssigned =
        true;

    donation.Status =
        "VolunteerAssigned";

    donation.UpdatedAt =
        DateTime.UtcNow;

    await _context.SaveChangesAsync();

    return Ok(donation);
}
    }
}