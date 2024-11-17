using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Basket.API.Migrations
{
    /// <inheritdoc />
    public partial class ChangeProductIdToString : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserBaskets",
                schema: "basket");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                schema: "basket",
                table: "CartItems",
                newName: "Id");

            migrationBuilder.AddColumn<int>(
                name: "Discount",
                schema: "basket",
                table: "CartItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "CatalogProductId",
                schema: "basket",
                table: "CartItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discount",
                schema: "basket",
                table: "CartItems");

            migrationBuilder.DropColumn(
                name: "CatalogProductId",
                schema: "basket",
                table: "CartItems");

            migrationBuilder.RenameColumn(
                name: "Id",
                schema: "basket",
                table: "CartItems",
                newName: "ProductId");

            migrationBuilder.CreateTable(
                name: "UserBaskets",
                schema: "basket",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserBaskets", x => x.UserId);
                });
        }
    }
}
