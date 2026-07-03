using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LeftoverFood.API.Migrations
{
    /// <inheritdoc />
    public partial class AddNotificationSent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "NotificationSent",
                table: "NightDeals",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NotificationSent",
                table: "NightDeals");
        }
    }
}
