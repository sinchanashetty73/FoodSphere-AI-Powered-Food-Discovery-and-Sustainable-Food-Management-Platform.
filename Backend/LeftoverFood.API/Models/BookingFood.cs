namespace LeftoverFood.API.Models
{
    public class BookingFood
    {
        public int Id { get; set; }

        public int BookingId { get; set; }

        public int FoodItemId { get; set; }

        public string FoodName { get; set; } = string.Empty;

        public int Price { get; set; }
    }
}