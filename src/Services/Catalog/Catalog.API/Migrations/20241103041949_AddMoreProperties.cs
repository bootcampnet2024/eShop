using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Catalog.API.Migrations
{
    /// <inheritdoc />
    public partial class AddMoreProperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Description",
                schema: "catalog",
                table: "Product",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(300)",
                oldMaxLength: 300);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                schema: "catalog",
                table: "Product",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Discount",
                schema: "catalog",
                table: "Product",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                schema: "catalog",
                table: "Product",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                schema: "catalog",
                table: "Category",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Description",
                schema: "catalog",
                table: "Category",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ImageURL",
                schema: "catalog",
                table: "Category",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                schema: "catalog",
                table: "Category",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                schema: "catalog",
                table: "Brand",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "ImageURL",
                schema: "catalog",
                table: "Brand",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                schema: "catalog",
                table: "Brand",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddCheckConstraint(
                name: "CK_Product_Discount",
                schema: "catalog",
                table: "Product",
                sql: "[Discount] BETWEEN 0 AND 100");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_Product_Discount",
                schema: "catalog",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                schema: "catalog",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "Discount",
                schema: "catalog",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                schema: "catalog",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                schema: "catalog",
                table: "Category");

            migrationBuilder.DropColumn(
                name: "Description",
                schema: "catalog",
                table: "Category");

            migrationBuilder.DropColumn(
                name: "ImageURL",
                schema: "catalog",
                table: "Category");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                schema: "catalog",
                table: "Category");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                schema: "catalog",
                table: "Brand");

            migrationBuilder.DropColumn(
                name: "ImageURL",
                schema: "catalog",
                table: "Brand");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                schema: "catalog",
                table: "Brand");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                schema: "catalog",
                table: "Product",
                type: "nvarchar(300)",
                maxLength: 300,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500);
        }
    }
}
