namespace Catalog.API.Controllers.Filters;

public class CatalogItemsFilter : GenericFilter
{
    public bool ShowOnlyHighlighted { get; set; }
    public IEnumerable<int> CategoriesIds { get; set; }
    public IEnumerable<int> BrandsIds { get; set; }
    public OrderBy FilterOrder { get; set; }
}

public enum OrderBy
{
    None,
    LowestPrice,
    HighestPrice,
    Latest
}
