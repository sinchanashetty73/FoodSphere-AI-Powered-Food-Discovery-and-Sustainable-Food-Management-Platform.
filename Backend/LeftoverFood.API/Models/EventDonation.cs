namespace LeftoverFood.API.Models
{
    public class EventDonation
    {
        public int Id { get; set; }

        public string EventName { get; set; } = string.Empty;

        public string OrganizerName { get; set; } = string.Empty;

        public string ContactNumber { get; set; } = string.Empty;

        public string FoodType { get; set; } = string.Empty;

        public int Quantity { get; set; }

        public string EventLocation { get; set; } = string.Empty;

        public DateTimeOffset EventDate { get; set; }

        public string PickupAddress { get; set; } = string.Empty;

        public string Status { get; set; } = "Pending";

        public DateTimeOffset CreatedAt { get; set; }
            = DateTimeOffset.UtcNow;
    }
}