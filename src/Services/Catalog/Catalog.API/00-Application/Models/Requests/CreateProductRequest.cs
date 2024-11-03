namespace Catalog.API._00_Application.Models.Requests
{
    public class CreateProductRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public int Discount { get; set; }
        public bool IsActive { get; set; }
        public bool IsHighlighted { get; set; }
        public string ImageURL { get; set; }
        public int BrandId { get; set; }
        public int CategoryId { get; set; }
    }
}
