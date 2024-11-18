namespace Basket.API._01_Services.DTOs
{
    public class CartItemDTO
    {
        public string ProductId { get; set; }
        public string ImageURL { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public int Discount { get; set; }
        public decimal FinalPrice => Price - (Price * (Discount / 100m));
    }
}
