namespace Catalog.API.Controllers.Core
{
    public class PaginatedItems<T> where T : class
    {
        public int PageSize { get; set; }
        public int PageIndex { get; set; }
        public long Count { get; set; }
        public IEnumerable<T> Items { get; set; }
    }
}
