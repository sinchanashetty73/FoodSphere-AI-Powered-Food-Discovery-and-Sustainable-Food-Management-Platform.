using Microsoft.AspNetCore.Mvc;
using LeftoverFood.API.Data;
using LeftoverFood.API.Models;

namespace LeftoverFood.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VolunteersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VolunteersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.Volunteers.ToList());
        }

        [HttpPost]
        public async Task<IActionResult> Create(
            Volunteer volunteer)
        {
            _context.Volunteers.Add(volunteer);

            await _context.SaveChangesAsync();

            return Ok(volunteer);
        }
        [HttpPut("{id}/assign-volunteer")]
public async Task<IActionResult> AssignVolunteer(
    int id,
    [FromBody] VolunteerAssignRequest request)
{
    var donation =
        await _context.DonationTrackings.FindAsync(id);

    if (donation == null)
        return NotFound();

    donation.VolunteerName =
        request.VolunteerName;

    donation.VolunteerPhone =
        request.VolunteerPhone;

    donation.VolunteerAssigned = true;

    donation.Status = "Volunteer Assigned";

    await _context.SaveChangesAsync();

    return Ok(donation);
}
    }
}