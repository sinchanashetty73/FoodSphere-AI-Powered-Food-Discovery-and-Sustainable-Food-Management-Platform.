namespace LeftoverFood.API.Models
{
    public class Donation
    {
        public int Id { get; set; }

        public string DonorName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string PhoneNumber { get; set; } = string.Empty;

        public string DonationType { get; set; } = string.Empty;

        public string FoodName { get; set; } = string.Empty;

        public int Quantity { get; set; } 

        public string PickupAddress { get; set; } = string.Empty;

        public string Status { get; set; } = "Pending";

        public DateTime DonationDate { get; set; }
            = DateTime.UtcNow;

            public string TrackingId { get; set; } =
    "FD" + Guid.NewGuid()
    .ToString("N")
    .Substring(0, 6)
    .ToUpper();

public string VolunteerName { get; set; } = "";

public string Destination { get; set; } = "";

public DateTime LastUpdated { get; set; }
    = DateTime.UtcNow;
    }
}