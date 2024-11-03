using Catalog.API._01_Services.Models;

namespace Catalog.API._01_Services.DTOs;

public class CatalogCategoryDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string ImageURL { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public static CatalogCategoryDTO FromModel(CatalogCategory category)
    {
        return new()
        {
            Id = category.Id,
            Name = category.Name,
            Description = category.Description,
            ImageURL = category.ImageURL,
            CreatedAt = category.CreatedAt,
            UpdatedAt = category.UpdatedAt
        };
    }
}
