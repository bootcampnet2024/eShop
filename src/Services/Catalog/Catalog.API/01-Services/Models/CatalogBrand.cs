namespace Catalog.API._01_Services.Models
{
    public class CatalogBrand : IEntity<int>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageURL { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
