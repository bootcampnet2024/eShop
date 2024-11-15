namespace Catalog.API._01_Services.DTOs
{
    public class CatalogDataDTO<T>
    {
        public int TotalItems { get; set; }
        public IEnumerable<T> Items { get; set; }
    }
}
