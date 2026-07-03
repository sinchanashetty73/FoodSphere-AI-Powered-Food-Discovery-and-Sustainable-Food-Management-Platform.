using Microsoft.AspNetCore.Mvc;
using LeftoverFood.API.Data;
using LeftoverFood.API.Models;

namespace LeftoverFood.API.Controllers
{
[ApiController]
[Route("api/[controller]")]
public class GroceryDonationsController : ControllerBase
{
private readonly AppDbContext _context;


    public GroceryDonationsController(AppDbContext context)
    {
        _context = context;
    }

    // CREATE GROCERY DONATION
    [HttpPost]
    public async Task<IActionResult> Create(
        [FromBody] GroceryDonation donation)
    {
       _context.DonationTrackings.Add(
    new DonationTracking
    {
        TrackingId = "FD" +
            Guid.NewGuid()
            .ToString("N")
            .Substring(0, 6)
            .ToUpper(),

        DonationType = "Grousery",

        DonorName = donation.DonorName,
        PhoneNumber = donation.ContactNumber,

        FoodName = donation.ItemName,
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
    

    // GET ALL GROCERY DONATIONS
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_context.GroceryDonations.ToList());
    }

    // GET GROCERY DONATION BY ID
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var donation = _context.GroceryDonations
            .FirstOrDefault(x => x.Id == id);

        if (donation == null)
        {
            return NotFound();
        }

        return Ok(donation);
    }

    // UPDATE GROCERY DONATION
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        int id,
        [FromBody] GroceryDonation updatedDonation)
    {
        var donation = _context.GroceryDonations
            .FirstOrDefault(x => x.Id == id);

        if (donation == null)
        {
            return NotFound();
        }

        donation.DonorName = updatedDonation.DonorName;
        donation.ContactNumber = updatedDonation.ContactNumber;
        donation.ItemName = updatedDonation.ItemName;
        donation.Quantity = updatedDonation.Quantity;
        donation.ExpiryDate = updatedDonation.ExpiryDate;
        donation.PickupAddress = updatedDonation.PickupAddress;
        donation.Status = updatedDonation.Status;

        await _context.SaveChangesAsync();

        return Ok(donation);
    }

    // DELETE GROCERY DONATION
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var donation = _context.GroceryDonations
            .FirstOrDefault(x => x.Id == id);

        if (donation == null)
        {
            return NotFound();
        }

        _context.GroceryDonations.Remove(donation);

        await _context.SaveChangesAsync();

        return Ok("Grocery Donation Deleted Successfully");
    }
}


}
