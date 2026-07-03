using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LeftoverFood.API.Migrations
{
    /// <inheritdoc />
    public partial class UpdateFoodItems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "FoodItems");

            migrationBuilder.DropColumn(
                name: "ExpiryTime",
                table: "FoodItems");

            migrationBuilder.DropColumn(
                name: "IsAvailable",
                table: "FoodItems");

            migrationBuilder.RenameColumn(
                name: "Location",
                table: "FoodItems",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "FoodName",
                table: "FoodItems",
                newName: "ImageUrl");

            migrationBuilder.AddColumn<int>(
                name: "Price",
                table: "FoodItems",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RestaurantId",
                table: "FoodItems",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "FoodItems");

            migrationBuilder.DropColumn(
                name: "RestaurantId",
                table: "FoodItems");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "FoodItems",
                newName: "Location");

            migrationBuilder.RenameColumn(
                name: "ImageUrl",
                table: "FoodItems",
                newName: "FoodName");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "FoodItems",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "ExpiryTime",
                table: "FoodItems",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsAvailable",
                table: "FoodItems",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
