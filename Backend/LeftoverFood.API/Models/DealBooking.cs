namespace LeftoverFood.API.Models
{
    public class DealBooking
    {
        public int Id { get; set; }

        public int FoodItemId { get; set; }

        public string FoodName { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public string UserEmail { get; set; } = string.Empty;

        public DateTime BookingDate { get; set; }
        public string PhoneNumber { get; set; }
public string PickupLocation { get; set; }
public int Quantity { get; set; }
public string PaymentMethod { get; set; }
public decimal TotalAmount { get; set; }
public string Status { get; set; } = "Pending";
    }
}