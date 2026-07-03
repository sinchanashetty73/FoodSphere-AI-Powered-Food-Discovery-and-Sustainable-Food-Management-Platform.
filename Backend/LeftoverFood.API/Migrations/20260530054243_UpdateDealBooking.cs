using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LeftoverFood.API.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDealBooking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PaymentMethod",
                table: "DealBookings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "DealBookings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PickupLocation",
                table: "DealBookings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "DealBookings",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "DealBookings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "TotalAmount",
                table: "DealBookings",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentMethod",
                table: "DealBookings");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "DealBookings");

            migrationBuilder.DropColumn(
                name: "PickupLocation",
                table: "DealBookings");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "DealBookings");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "DealBookings");

            migrationBuilder.DropColumn(
                name: "TotalAmount",
                table: "DealBookings");
        }
    }
}
