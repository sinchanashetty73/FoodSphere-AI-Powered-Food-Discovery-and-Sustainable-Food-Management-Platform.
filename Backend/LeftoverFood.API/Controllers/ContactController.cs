using LeftoverFood.API.Data;
using LeftoverFood.API.DTOs;
using LeftoverFood.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace LeftoverFood.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ContactController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/contact
        [HttpPost]
        public async Task<IActionResult> SubmitContact(ContactDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

           var contact = new Contact
{
    Name = dto.Name,
    Email = dto.Email,
    Subject = dto.Subject,
    Message = dto.Message,
    CreatedAt = DateTime.UtcNow
};

            _context.Contacts.Add(contact);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Contact form submitted successfully"
            });
        }

        // GET: api/contact
        [HttpGet]
        public IActionResult GetAllContacts()
        {
            var contacts = _context.Contacts
                .OrderByDescending(x => x.CreatedAt)
                .ToList();

            return Ok(contacts);
        }
    }
}