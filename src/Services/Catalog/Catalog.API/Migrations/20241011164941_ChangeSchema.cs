using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Catalog.API.Migrations
{
    /// <inheritdoc />
    public partial class ChangeSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "catalog");

            migrationBuilder.RenameTable(
                name: "Product",
                newName: "Product",
                newSchema: "catalog");

            migrationBuilder.RenameTable(
                name: "Category",
                newName: "Category",
                newSchema: "catalog");

            migrationBuilder.RenameTable(
                name: "Brand",
                newName: "Brand",
                newSchema: "catalog");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "Product",
                schema: "catalog",
                newName: "Product");

            migrationBuilder.RenameTable(
                name: "Category",
                schema: "catalog",
                newName: "Category");

            migrationBuilder.RenameTable(
                name: "Brand",
                schema: "catalog",
                newName: "Brand");
        }
    }
}
