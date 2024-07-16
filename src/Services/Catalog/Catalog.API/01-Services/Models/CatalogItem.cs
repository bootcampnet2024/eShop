namespace Catalog.API.Services.Models
{
    public class CatalogItem
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public CatalogBrand Brand { get; set; }
        public CatalogCategory Category { get; set; }
    }
}
