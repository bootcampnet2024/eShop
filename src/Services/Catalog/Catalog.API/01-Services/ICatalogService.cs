using Catalog.API._01_Services.DTOs;
using Catalog.API._02_Infrastructure.Data;
using Catalog.API.Services.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Catalog.API.Services;

public interface ICatalogService
{
    IEnumerable<CatalogCategoryDTO> GetAllCategories();
    CatalogItemDataResult GetAll(CatalogItemFilter filter);
}

public class CatalogService(ApplicationDataContext context) : ICatalogService
{
    private readonly ApplicationDataContext _context = context;

    public IEnumerable<CatalogCategoryDTO> GetAllCategories()
    {
        return _context.CatalogCategories.Select(c => new CatalogCategoryDTO { Id = c.Id, Name = c.Name });
    }

    public CatalogItemDataResult GetAll(CatalogItemFilter filter)
    {
        filter ??= new CatalogItemFilter();

        if (filter.PageSize <= 0)
            filter.PageSize = 10;

        if (filter.PageSize > 50)
            filter.PageSize = 50;

        var query = _context.CatalogItems.AsQueryable();

        query = query.Where(w => (!filter.ShowOnlyHighlighted || w.IsHighlighted));

        var category = _context.CatalogCategories.Find(filter.CategoryId);

        query = query.Where(w => (category == null || w.Category.Id == category.Id));

        var totalItems = query.Count();

        var data = query
            .OrderByDescending(o => o.IsHighlighted)
            .Skip(filter.PageIndex * filter.PageSize)
            .Take(filter.PageSize)
            .AsNoTracking()
            .Select(item => new CatalogItemDTO
            {
                Id = item.Id,
                Name = item.Name,
                Description = item.Description,
                Category = item.Category.Name,
                Brand = item.Brand.Name,
                Price = item.Price
            })
            .ToList();

        return new CatalogItemDataResult() { TotalItems = totalItems, Items = data };
    }
}

public class CatalogItemFilter
{
    public bool ShowOnlyHighlighted { get; set; } = true;
    public int CategoryId { get; set; } = 0;
    public int PageIndex { get; set; } = 0;
    public int PageSize { get; set; } = 10;
}

public class CatalogItemDataResult
{
    public int TotalItems { get; set; }
    public IEnumerable<CatalogItemDTO> Items { get; set; }
}

