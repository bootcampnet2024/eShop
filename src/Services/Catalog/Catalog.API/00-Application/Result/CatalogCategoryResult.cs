using Catalog.API._01_Services.DTOs;

namespace Catalog.API._00_Application.Result;

public class CatalogCategoryResult
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string ImageURL { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public static CatalogCategoryResult FromDTO(CatalogCategoryDTO categoryDTO)
    {
        return new()
        {
            Id = categoryDTO.Id,
            Name = categoryDTO.Name,
            Description = categoryDTO.Description,
            ImageURL = categoryDTO.ImageURL,
            CreatedAt = categoryDTO.CreatedAt,
            UpdatedAt = categoryDTO.UpdatedAt,
        };
    }
}
