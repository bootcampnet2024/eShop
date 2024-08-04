namespace Catalog.API.Controllers.Core;

public class PaginatedItems<T> where T : class
{
    public bool ShowOnlyHighlighted { get; set; }
    public int PageSize { get; set; }
    public int PageIndex { get; set; }
    public long Count { get; set; }
    public string Category { get; set; }
    public IEnumerable<T> Items { get; set; }
}
