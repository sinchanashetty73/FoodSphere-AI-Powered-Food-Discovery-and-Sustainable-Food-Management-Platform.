namespace LeftoverFood.API.Models
{
    public class Volunteer
{
    public int Id { get; set; }

    public string Name { get; set; } = "";

    public string PhoneNumber { get; set; } = "";

    public string Email { get; set; } = "";

    public string Area { get; set; } = "";

    public bool IsAvailable { get; set; } = true;

    
}
}
