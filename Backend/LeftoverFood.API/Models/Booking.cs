namespace LeftoverFood.API.Models
{
    public class Booking
    {
        public int Id { get; set; }

        public string CustomerName { get; set; } = string.Empty;

        public string PhoneNumber { get; set; } = string.Empty;

        public string BookingDate { get; set; } = string.Empty;

        public string BookingTime { get; set; } = string.Empty;

        public string TableNumber { get; set; } = string.Empty;

        public int TotalAmount { get; set; }

        public string PaymentMethod { get; set; } = string.Empty;
    }
}