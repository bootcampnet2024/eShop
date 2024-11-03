using Catalog.API._01_Services.DTOs;

namespace Catalog.API._00_Application.Result;

public class CatalogItemsResult
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
    public int Discount { get; set; }
    public decimal FinalPrice => Price - (Price * (Discount / 100)); 
    public string ImageURL { get; set; }
    public bool IsHighlighted { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string Category { get; set; }
    public string Brand { get; set; }

    public static CatalogItemsResult FromDTO(CatalogItemDTO itemDTO)
    {
        return new()
        {
            Id = itemDTO.Id,
            Name = itemDTO.Name,
            Description = itemDTO.Description,
            Quantity = itemDTO.Quantity,
            Price = itemDTO.Price,
            ImageURL = itemDTO.ImageURL,
            IsHighlighted = itemDTO.IsHighlighted,
            IsActive = itemDTO.IsActive,
            CreatedAt = itemDTO.CreatedAt,
            UpdatedAt = itemDTO.UpdatedAt,
            Category = itemDTO.Category,
            Brand = itemDTO.Brand
        };
    }
}
