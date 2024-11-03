namespace Catalog.API._01_Services.Models
{
    public class CatalogItem : IEntity<Guid>
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
        public CatalogBrand Brand { get; set; }
        public CatalogCategory Category { get; set; }
    }
}
