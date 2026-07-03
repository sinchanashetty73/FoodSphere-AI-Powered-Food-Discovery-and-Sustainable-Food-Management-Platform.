namespace LeftoverFood.API.Models
{
    public class IndividualDonation
    {
        public int Id { get; set; }

        public string DonorName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string PhoneNumber { get; set; } = string.Empty;

        public string FoodName { get; set; } = string.Empty;

        public int Quantity { get; set; }

        public string FoodCondition { get; set; } = string.Empty;

        public string PickupAddress { get; set; } = string.Empty;

     public DateTime PickupTime { get; set; }
     public string Status { get; set; } = "Pending";


public DateTime CreatedAt { get; set; }
    = DateTime.UtcNow;

        
    
    }
}