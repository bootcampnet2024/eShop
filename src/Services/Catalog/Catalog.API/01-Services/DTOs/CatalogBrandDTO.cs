using Catalog.API._01_Services.Models;

namespace Catalog.API._01_Services.DTOs
{
    public class CatalogBrandDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageURL { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public static CatalogBrandDTO FromModel(CatalogBrand brand)
        {
            return new()
            {
                Id = brand.Id,
                Name = brand.Name,
                ImageURL = brand.ImageURL,
                CreatedAt = brand.CreatedAt,
                UpdatedAt = brand.UpdatedAt
            };
        }
    }
}
