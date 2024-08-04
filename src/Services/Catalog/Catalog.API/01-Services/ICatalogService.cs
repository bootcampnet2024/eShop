using Catalog.API._01_Services.DTOs;
using Catalog.API._02_Infrastructure.Data;
using Catalog.API.Services.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Catalog.API.Services;

public interface ICatalogService
{
    IEnumerable<CatalogCategoryDTO> GetAllCategories();
    CatalogCategoryDTO GetCategoryById(int id);
    CatalogItemDataResult GetAllItems(CatalogItemFilter filter);
}

public class CatalogService(ApplicationDataContext context) : ICatalogService
{
    private readonly ApplicationDataContext _context = context;

    public IEnumerable<CatalogCategoryDTO> GetAllCategories()
    {
        return _context.CatalogCategories.Select(c => new CatalogCategoryDTO { Id = c.Id, Name = c.Name });
    }

    public CatalogCategoryDTO GetCategoryById(int id)
    {
        var category = _context.CatalogCategories.FirstOrDefault(c => c.Id == id);

        if (category is null)
            return null;

        return new CatalogCategoryDTO { Id = category.Id, Name = category.Name };
    }

    public CatalogItemDataResult GetAllItems(CatalogItemFilter filter)
    {
        filter ??= new CatalogItemFilter();

        if (filter.PageSize <= 0)
            filter.PageSize = 10;

        if (filter.PageSize > 50)
            filter.PageSize = 50;

        var query = _context.CatalogItems.AsQueryable();

        if (filter.ShowOnlyHighlighted) // Aqui o comportamento foi mudado,
                                        // antes só mostrava produtos com destaque ou sem, eles não mostravam-se juntos.
            query = query.Where(w => w.IsHighlighted);

        var category = GetCategoryById(filter.CategoryId);

        if (category is not null)
            query = query.Where(w => w.Category.Id == category.Id);

        var totalItems = query.Count();

        var data = query
            .OrderByDescending(o => o.IsHighlighted) /* Como esse método será o padrão para pesquisar produtos,
                                                      * talvez seja uma boa ideia organiza-los baseado no destaque.
                                                      * Com certeza será ignorado caso ShowOnlyHighlighted for verdadeiro. */
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

        return new CatalogItemDataResult() { TotalItems = totalItems, CategoryName = category?.Name, Items = data };
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
    public string CategoryName { get; set; }
    public IEnumerable<CatalogItemDTO> Items { get; set; }
}

