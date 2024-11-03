using Catalog.API._01_Services.DTOs;

namespace Catalog.API._00_Application.Result
{
    public class CatalogBrandResult
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageURL { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public static CatalogBrandResult FromDTO(CatalogBrandDTO brandDTO)
        {
            return new()
            {
                Id = brandDTO.Id,
                Name = brandDTO.Name,
                ImageURL = brandDTO.ImageURL,
                CreatedAt = brandDTO.CreatedAt,
                UpdatedAt = brandDTO.UpdatedAt
            };
        }
    }
}
