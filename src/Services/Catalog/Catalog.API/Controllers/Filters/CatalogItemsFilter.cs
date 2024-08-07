namespace Catalog.API.Controllers.Filters;

public class CatalogItemsFilter
{
    public bool ShowOnlyHighlighted { get; set; } = true;
    public int PageSize { get; set; } = 10;
    public int CategoryId { get; set; } = 0;
    public int PageIndex { get; set; } = 0;
}
