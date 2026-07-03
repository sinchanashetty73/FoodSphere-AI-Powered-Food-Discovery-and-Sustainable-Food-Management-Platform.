namespace LeftoverFood.API.Models
{
    public class MealDonation
    {
        public int Id { get; set; }

        public int DonationRequestId { get; set; }

        public int MealsDonated { get; set; }

        public DateTime CreatedAt { get; set; }
            = DateTime.UtcNow;
    }
}