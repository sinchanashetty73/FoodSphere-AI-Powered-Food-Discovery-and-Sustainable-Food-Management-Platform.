namespace LeftoverFood.API.Models
{
  public class GroceryDonation
{
    public int Id { get; set; }

    public string DonorName { get; set; } = string.Empty;

    public string ContactNumber { get; set; } = string.Empty;

    public string ItemName { get; set; } = string.Empty;

    public int Quantity { get; set; }

    public DateTimeOffset ExpiryDate { get; set; }

    public string PickupAddress { get; set; } = string.Empty;

    public string Status { get; set; } = "Pending";

    public DateTimeOffset CreatedAt { get; set; }
        = DateTimeOffset.UtcNow;
}
}