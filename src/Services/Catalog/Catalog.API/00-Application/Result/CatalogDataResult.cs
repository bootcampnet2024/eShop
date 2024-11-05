namespace Catalog.API._00_Application.Result
{
    public class CatalogDataResult<T>
    {
        public int TotalItems { get; set; }
        public IEnumerable<T> Items { get; set; }
    }
}
