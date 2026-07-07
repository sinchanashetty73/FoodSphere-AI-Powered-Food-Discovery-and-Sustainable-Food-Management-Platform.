namespace LeftoverFood.API.Models
{
public class HomeMadeFood

    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string ImageUrl { get; set; } = string.Empty;

        public int Price { get; set; }

        public int OriginalPrice { get; set; }

        public string Seller { get; set; } = string.Empty;

        public double Rating { get; set; }

        public string Location { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string Category { get; set; } = string.Empty;
    }
}
