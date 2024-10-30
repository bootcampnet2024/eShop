namespace Catalog.API.Controllers.Filters;

public class CatalogItemsFilter
{
    public bool ShowOnlyHighlighted { get; set; }
    public int PageSize { get; set; } 
    public IEnumerable<int> CategoriesIds { get; set; } 
    public IEnumerable<int> BrandsIds { get; set; }
    public OrderBy FilterOrder { get; set; }
    public int PageIndex { get; set; } 
}

public enum OrderBy 
{
    None,
    LowestPrice,
    HighestPrice
}
