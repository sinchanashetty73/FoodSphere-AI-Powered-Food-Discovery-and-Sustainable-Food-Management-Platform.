using Microsoft.AspNetCore.Mvc;
using LeftoverFood.API.Data;
using LeftoverFood.API.Models;

namespace LeftoverFood.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DealBookingController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DealBookingController(AppDbContext context)
        {
            _context = context;
        }

        // Reserve a deal
        [HttpPost]
public async Task<IActionResult> ReserveDeal(
    [FromBody] DealBooking booking)
{
    try
    {
        booking.BookingDate = DateTime.UtcNow;

        _context.DealBookings.Add(booking);

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Deal Reserved Successfully"
        });
    }
    catch (Exception ex)
    {
        return BadRequest(ex.Message);
    }
}
    }
}