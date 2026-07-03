using Microsoft.EntityFrameworkCore;
using LeftoverFood.API.Models;

namespace LeftoverFood.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    //  FoodItems
        public DbSet<FoodItem> FoodItems { get; set; }
        // Users
        public DbSet<User> Users { get; set; } 

        // RESTAURANTS
        public DbSet<Restaurant> Restaurants { get; set; }

        // BOOKINGS
        public DbSet<Booking> Bookings { get; set; }

        // bookingfoods
        public DbSet<BookingFood> BookingFoods { get; set; }

        // Homemade foods
        public DbSet<HomeMadeFood> HomeMadeFoods { get; set; }

        // Reviews
        public DbSet<Review> Reviews { get; set; }
        
        //Contacts
        public DbSet<Contact> Contacts { get; set; }
        
        // Night Deals
        public DbSet<DealBooking> DealBookings { get; set; }

        // Donations
        public DbSet<Donation> Donations { get; set; }

        // Donation Tables

        public DbSet<IndividualDonation>
            IndividualDonations { get; set; }

        public DbSet<RestaurantDonation>
            RestaurantDonations { get; set; }

        public DbSet<EventDonation>
            EventDonations { get; set; }

        public DbSet<GroceryDonation>
            GroceryDonations { get; set; }

            // donation
            public DbSet<MealDonation> MealDonations { get; set; }

            // Donations Tracking
            public DbSet<DonationTracking> DonationTrackings { get; set; }

            // volunteer assigned
            public DbSet<Volunteer> Volunteers { get; set; }

            

            // // Night deals
            // public DbSet<NightDeal> NightDeals { get; set; }

            //   Notifications
           public DbSet<AppNotification> Notifications { get; set; }

         // FCM TOKENS
        public DbSet<FcmToken> FcmTokens { get; set; }

        
        
    }
}