using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LeftoverFood.API.Migrations
{
    /// <inheritdoc />
    public partial class AddDonorDetailsToTracking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DonorName",
                table: "DonationTrackings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "DonationTrackings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "DonationTrackings",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DonorName",
                table: "DonationTrackings");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "DonationTrackings");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "DonationTrackings");
        }
    }
}
