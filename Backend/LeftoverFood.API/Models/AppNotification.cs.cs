namespace LeftoverFood.API.Models
{
    public class AppNotification
    {
        public int Id { get; set; }

        public string Title { get; set; } = "";

        public string Message { get; set; } = "";

        public DateTime CreatedAt { get; set; } =
            DateTime.Now;

        public bool IsRead { get; set; } = false;
    }
}