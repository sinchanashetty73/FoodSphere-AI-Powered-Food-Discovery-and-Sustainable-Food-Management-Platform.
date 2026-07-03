using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LeftoverFood.API.Data;
using LeftoverFood.API.Models;
using LeftoverFood.API.DTOs;

namespace LeftoverFood.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BookingsController(AppDbContext context)
        {
            _context = context;
        }

        // GET ALL BOOKINGS
        [HttpGet]
        public async Task<IActionResult> GetBookings()
        {
            var bookings = await _context.Bookings.ToListAsync();

            return Ok(bookings);
        }

        // CREATE BOOKING
        [HttpPost]
        public async Task<IActionResult> CreateBooking(
            BookingRequestDto dto)
        {
            var booking = new Booking
            {
                CustomerName = dto.CustomerName,
                PhoneNumber = dto.PhoneNumber,
                BookingDate = dto.BookingDate,
                BookingTime = dto.BookingTime,
                TableNumber = dto.TableNumber,
                TotalAmount = dto.TotalAmount,
                PaymentMethod = dto.PaymentMethod
            };

            _context.Bookings.Add(booking);

            await _context.SaveChangesAsync();

            foreach (var food in dto.Foods)
            {
                var bookingFood = new BookingFood
                {
                    BookingId = booking.Id,
                    FoodItemId = food.FoodItemId,
                    FoodName = food.FoodName,
                    Price = food.Price
                };

                _context.BookingFoods.Add(bookingFood);
            }

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Booking saved successfully"
            });
        }
    }
}