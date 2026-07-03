namespace LeftoverFood.API.Models
{
    public class RestaurantDonation
    {
        public int Id { get; set; }

        public string RestaurantName { get; set; } = string.Empty;

        public string OwnerName { get; set; } = string.Empty;

        public string ContactNumber { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string RestaurantType { get; set; } = string.Empty;

        public string FoodCategory { get; set; } = string.Empty;

        public int Quantity { get; set; }

        public string FoodCondition { get; set; } = string.Empty;

        public DateTimeOffset PreparedAt { get; set; }

        public DateTimeOffset PickupUntil { get; set; }

        public string PickupAddress { get; set; } = string.Empty;

        public string Status { get; set; } = "Pending";

        public DateTimeOffset CreatedAt { get; set; }
            = DateTimeOffset.UtcNow;
    }
}