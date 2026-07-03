namespace LeftoverFood.API.Models
{
    public class FoodItem
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public int Price { get; set; }

        public string ImageUrl { get; set; } = string.Empty;

        public int RestaurantId { get; set; }

        // NEW FIELDS
        public bool IsNightDeal { get; set; }

        public DateTime DealStartTime { get; set; }

        public DateTime DealEndTime { get; set; }

       // Night Deal Fields
    public string Restaurant { get; set; } = string.Empty;

    public string Category { get; set; } = string.Empty;

    public decimal OriginalPrice { get; set; }

    public decimal DiscountedPrice { get; set; }

    public string PickupTime { get; set; } = string.Empty;

    public int Quantity { get; set; }

    //  public DateTime BookingDate { get; set; } = DateTime.UtcNow;
    }
}