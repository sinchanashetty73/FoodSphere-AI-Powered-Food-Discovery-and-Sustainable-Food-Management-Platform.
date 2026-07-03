using Microsoft.AspNetCore.Mvc;
using LeftoverFood.API.Data;
using LeftoverFood.API.Models;

namespace LeftoverFood.API.Controllers
{
[ApiController]
[Route("api/[controller]")]
public class EventDonationsController : ControllerBase
{
private readonly AppDbContext _context;

    public EventDonationsController(AppDbContext context)
    {
        _context = context;
    }

    // CREATE EVENT DONATION
    [HttpPost]
    public async Task<IActionResult> Create(
        [FromBody] EventDonation donation)
    {
       _context.DonationTrackings.Add(
    new DonationTracking
    {
        TrackingId = "FD" +
            Guid.NewGuid()
            .ToString("N")
            .Substring(0, 6)
            .ToUpper(),

        DonationType = "Events",

        EventName = donation.EventName,
DonorName = donation.OrganizerName,
PhoneNumber = donation.ContactNumber,

        FoodName = donation.FoodType ,
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
    

    // GET ALL EVENT DONATIONS
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_context.EventDonations.ToList());
    }

    // GET EVENT DONATION BY ID
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var donation = _context.EventDonations
            .FirstOrDefault(x => x.Id == id);

        if (donation == null)
        {
            return NotFound();
        }

        return Ok(donation);
    }

    // UPDATE EVENT DONATION
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        int id,
        [FromBody] EventDonation updatedDonation)
    {
        var donation = _context.EventDonations
            .FirstOrDefault(x => x.Id == id);

        if (donation == null)
        {
            return NotFound();
        }

        donation.EventName = updatedDonation.EventName;
        donation.OrganizerName = updatedDonation.OrganizerName;
        donation.ContactNumber = updatedDonation.ContactNumber;
        donation.FoodType = updatedDonation.FoodType;
        donation.Quantity = updatedDonation.Quantity;
        donation.EventLocation = updatedDonation.EventLocation;
        donation.EventDate = updatedDonation.EventDate;
        donation.PickupAddress = updatedDonation.PickupAddress;
        donation.Status = updatedDonation.Status;

        await _context.SaveChangesAsync();

        return Ok(donation);
    }

    // DELETE EVENT DONATION
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var donation = _context.EventDonations
            .FirstOrDefault(x => x.Id == id);

        if (donation == null)
        {
            return NotFound();
        }

        _context.EventDonations.Remove(donation);

        await _context.SaveChangesAsync();

        return Ok("Event Donation Deleted Successfully");
    }
}

}
