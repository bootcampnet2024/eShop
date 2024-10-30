using Catalog.API._02_Infrastructure.Data;
using Catalog.API._01_Services.Models;
using Microsoft.EntityFrameworkCore;
using Catalog.API.Controllers.Filters;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Catalog.API._01_Services.DTOs;

namespace Catalog.API._01_Services;
public interface ICatalogItemService : IService<CatalogItem, Guid>
{
    Task<CatalogItemDataResult> GetAll(CatalogItemsFilter filter);
}
public class CatalogItemService(ApplicationDataContext context) : ICatalogItemService
{
    public readonly ApplicationDataContext _context = context;
    public async Task<bool> Add(CatalogItem product)
    {
        await _context.CatalogItems.AddAsync(product);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> Delete(Guid id)
    {
        var product = await _context.CatalogItems.FindAsync(id);

        if (product == null) return false;

        product.IsActive = false;
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<IEnumerable<CatalogItem>> GetAll()
    {
        var product = await _context.CatalogItems.Include(p => p.Category).Include(p => p.Brand).ToListAsync();

        if (product == null) return null;

        return product;
    }

    public async Task<CatalogItemDataResult> GetAll(CatalogItemsFilter filter)
    {
        filter ??= new CatalogItemsFilter()
        {
            ShowOnlyHighlighted = false,
            PageIndex = 0,
            PageSize = 20,
            BrandsIds = [],
            CategoriesIds = [],
            FilterOrder = OrderBy.None
        };

        if (filter.PageSize <= 0)
            filter.PageSize = 10;

        if (filter.PageSize > 50)
            filter.PageSize = 50;

        var query = _context.CatalogItems.AsQueryable();

        query = query.Where(w => (!filter.ShowOnlyHighlighted || w.IsHighlighted));

        var categoriesIds = _context.CatalogCategories.Where(w => filter.CategoriesIds.Contains(w.Id)).Select(w => w.Id);

        var brandsIds = _context.CatalogBrands.Where(w => filter.BrandsIds.Contains(w.Id)).Select(w => w.Id);

        query = query.Where(w => (!categoriesIds.Any() || categoriesIds.Contains(w.Category.Id)));

        query = query.Where(w => (!brandsIds.Any() || brandsIds.Contains(w.Brand.Id)));

        if (filter.FilterOrder == OrderBy.None) query = query.OrderByDescending(w => w.IsHighlighted);

        if (filter.FilterOrder == OrderBy.LowestPrice) query = query.OrderBy(w => w.Price);

        if (filter.FilterOrder == OrderBy.HighestPrice) query = query.OrderByDescending(w => w.Price);

        var data = await query
            .Skip(filter.PageIndex * filter.PageSize)
            .Take(filter.PageSize)
            .Include(x => x.Brand)
            .Include(x => x.Category)
            .AsSplitQuery()
            .AsNoTracking()
            .ToListAsync();

        var totalItems = query.Count();
        
        return new CatalogItemDataResult() { TotalItems = totalItems, Items = data };
    }

    public async Task<CatalogItem> GetById(Guid id)
    {
        var product = await _context.CatalogItems.FindAsync(id);

        if (product == null) return null;

        await _context.Entry(product).Reference(p => p.Category).LoadAsync();
        await _context.Entry(product).Reference(p => p.Brand).LoadAsync();

        return product;
    }

    public async Task<IEnumerable<CatalogItem>> GetByName(string name)
    {
        var product = await _context.CatalogItems
            .OrderByDescending(p => p.IsActive)
            .OrderByDescending (p => p.Name)
            .Include(p => p.Category)
            .Include(p => p.Brand)
            .Where(p => p.Name.ToLower().Contains(name.ToLower()))
            .ToListAsync();

        if (product == null) return null;

        return product;
    }

    public async Task<int> GetCount()
    {
        return await _context.CatalogItems.CountAsync();
    }

    public async Task<bool> Update(Guid id, CatalogItem product)
    {
        var productId = await _context.CatalogItems.FindAsync(id);

        if (productId == null) return false;

        _context.CatalogItems.Update(productId);
        return await _context.SaveChangesAsync() > 0;
    }
}

public class CatalogItemDataResult
{
    public int TotalItems { get; set; }
    public IEnumerable<CatalogItem> Items { get; set; }
}