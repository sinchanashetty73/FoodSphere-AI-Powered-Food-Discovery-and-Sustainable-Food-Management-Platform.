namespace LeftoverFood.API.DTOs
{
    public class BookingRequestDto
    {
        public string CustomerName { get; set; } = string.Empty;

        public string PhoneNumber { get; set; } = string.Empty;

        public string BookingDate { get; set; } = string.Empty;

        public string BookingTime { get; set; } = string.Empty;

        public string TableNumber { get; set; } = string.Empty;

        public int TotalAmount { get; set; }

        public string PaymentMethod { get; set; } = string.Empty;

        public List<FoodDto> Foods { get; set; } = new();
    }

    public class FoodDto
    {
        public int FoodItemId { get; set; }

        public string FoodName { get; set; } = string.Empty;

        public int Price { get; set; }
    }
}