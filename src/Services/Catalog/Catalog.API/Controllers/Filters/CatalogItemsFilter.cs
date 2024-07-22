namespace Catalog.API.Controllers.Filters
{
    public class CatalogItemsFilter
    {
        public bool ShowOnlyHighlighted { get; set; }
        public int PageSize { get; set; }
        public int PageIndex { get; set; }

    }
}
