using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ordering.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class FirstMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "orders");

            migrationBuilder.CreateSequence(
                name: "buyerseq",
                schema: "orders",
                incrementBy: 10);

            migrationBuilder.CreateSequence(
                name: "orderitemseq",
                schema: "orders",
                incrementBy: 10);

            migrationBuilder.CreateSequence(
                name: "orderseq",
                schema: "orders",
                incrementBy: 10);

            migrationBuilder.CreateSequence(
                name: "paymentseq",
                schema: "orders",
                incrementBy: 10);

            migrationBuilder.CreateTable(
                name: "Buyer",
                schema: "orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    IdentityGuid = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Buyer", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CardType",
                schema: "orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CardType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Order",
                schema: "orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    OrderDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    Street = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ZipCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BuyerId = table.Column<int>(type: "int", nullable: true),
                    OrderStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PaymentId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Order_Buyer_BuyerId",
                        column: x => x.BuyerId,
                        principalSchema: "orders",
                        principalTable: "Buyer",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PaymentMethod",
                schema: "orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    _cardTypeId = table.Column<int>(type: "int", nullable: false),
                    BuyerId = table.Column<int>(type: "int", nullable: false),
                    Alias = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CardHolderName = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    CardNumber = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: false),
                    Expiration = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentMethod", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PaymentMethod_CardType__cardTypeId",
                        column: x => x._cardTypeId,
                        principalSchema: "orders",
                        principalTable: "CardType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "Fk_PaymentMethod_Buyer",
                        column: x => x.BuyerId,
                        principalSchema: "orders",
                        principalTable: "Buyer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderItem",
                schema: "orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    ProductName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PictureUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UnitPrice = table.Column<decimal>(type: "decimal(9,2)", nullable: false),
                    Discount = table.Column<decimal>(type: "decimal(4,2)", nullable: false),
                    Units = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    OrderId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItem", x => x.Id);
                    table.CheckConstraint("CK_Discount_LessThan100", "[Discount] < 100");
                    table.CheckConstraint("CK_Discount_NonNegative", "[Discount] >= 0");
                    table.CheckConstraint("CK_Units_NonNegativeOrZero", "[Units] > 0");
                    table.ForeignKey(
                        name: "Fk_Order_OrderItem",
                        column: x => x.OrderId,
                        principalSchema: "orders",
                        principalTable: "Order",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Buyer_IdentityGuid",
                schema: "orders",
                table: "Buyer",
                column: "IdentityGuid",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Order_BuyerId",
                schema: "orders",
                table: "Order",
                column: "BuyerId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItem_OrderId",
                schema: "orders",
                table: "OrderItem",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentMethod__cardTypeId",
                schema: "orders",
                table: "PaymentMethod",
                column: "_cardTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentMethod_BuyerId",
                schema: "orders",
                table: "PaymentMethod",
                column: "BuyerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderItem",
                schema: "orders");

            migrationBuilder.DropTable(
                name: "PaymentMethod",
                schema: "orders");

            migrationBuilder.DropTable(
                name: "Order",
                schema: "orders");

            migrationBuilder.DropTable(
                name: "CardType",
                schema: "orders");

            migrationBuilder.DropTable(
                name: "Buyer",
                schema: "orders");

            migrationBuilder.DropSequence(
                name: "buyerseq",
                schema: "orders");

            migrationBuilder.DropSequence(
                name: "orderitemseq",
                schema: "orders");

            migrationBuilder.DropSequence(
                name: "orderseq",
                schema: "orders");

            migrationBuilder.DropSequence(
                name: "paymentseq",
                schema: "orders");
        }
    }
}
