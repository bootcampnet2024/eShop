using Catalog.API._01_Services.Models;

namespace Catalog.API._01_Services.DTOs
{
    public class CatalogItemDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public int Discount { get; set; }
        public string ImageURL { get; set; }
        public bool IsActive { get; set; }
        public bool IsHighlighted { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string Brand { get; set; }
        public string Category { get; set; }

        public static CatalogItemDTO FromModel(CatalogItem item)
        {
            return new()
            {
                Id = item.Id,
                Name = item.Name,
                Description = item.Description,
                Quantity = item.Quantity,
                Price = item.Price,
                Discount = item.Discount,
                ImageURL = item.ImageURL,
                IsActive = item.IsActive,
                IsHighlighted = item.IsHighlighted,
                CreatedAt = item.CreatedAt,
                UpdatedAt = item.UpdatedAt,
                Brand = item.Brand.Name,
                Category = item.Category.Name
            };
        }
    }
}
