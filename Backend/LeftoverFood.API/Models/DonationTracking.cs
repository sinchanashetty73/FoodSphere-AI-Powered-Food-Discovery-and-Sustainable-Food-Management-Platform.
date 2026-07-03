namespace LeftoverFood.API.Models
{
    public class DonationTracking
    {
        public int Id { get; set; }

        public string TrackingId { get; set; } = string.Empty;

        public string DonorName { get; set; } = string.Empty;

        public string RestaurantName { get; set; } = string.Empty;

public string EventName { get; set; } = string.Empty;

    public string PhoneNumber { get; set; } = string.Empty;

     public string Email { get; set; } = string.Empty;

        public string DonationType { get; set; } = string.Empty;

        public string FoodName { get; set; } = string.Empty;

        public int Quantity { get; set; }

        public string PickupLocation { get; set; } = string.Empty;

        public string Destination { get; set; } = "Waiting NGO";

      public string VolunteerName { get; set; } = "";

public string VolunteerPhone { get; set; } = "";

public bool VolunteerAssigned { get; set; } = false;

public string Status { get; set; } = "Submitted";

        public DateTime UpdatedAt { get; set; }
            = DateTime.UtcNow;
    }
}