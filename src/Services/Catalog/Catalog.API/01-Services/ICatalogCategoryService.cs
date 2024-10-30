using Catalog.API._02_Infrastructure.Data;
using Catalog.API._01_Services.Models;
using Microsoft.EntityFrameworkCore;
using Catalog.API.Controllers.Filters;

namespace Catalog.API._01_Services;
public interface ICatalogCategoryService : IService<CatalogCategory, int>
{
    Task<CatalogCategoryDataResult> GetAll(GenericFilter filter);
}
public class CatalogCategoryService(ApplicationDataContext context) : ICatalogCategoryService
{
    public readonly ApplicationDataContext _context = context;
    public async Task<bool> Add(CatalogCategory category)
    {
        await _context.CatalogCategories.AddAsync(category);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> Delete(int id)
    {
        var CatalogCategory = await _context.CatalogCategories.FindAsync(id);

        if (CatalogCategory == null) return false;

        _context.CatalogCategories.Remove(CatalogCategory);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<CatalogCategoryDataResult> GetAll(GenericFilter filter)
    {
        filter ??= new GenericFilter()
        {
            PageIndex = 0,
            PageSize = 20,
        };

        if (filter.PageSize <= 0)
            filter.PageSize = 10;

        if (filter.PageSize > 50)
            filter.PageSize = 50;

        var query = _context.CatalogCategories.AsQueryable();

        var data = await query
            .Skip(filter.PageIndex * filter.PageSize)
            .Take(filter.PageSize)
            .AsSplitQuery()
            .AsNoTracking()
            .ToListAsync();

        var totalItems = query.Count();

        return new CatalogCategoryDataResult() { TotalItems = totalItems, Items = data };
    }

    public Task<IEnumerable<CatalogCategory>> GetAll()
    {
        throw new NotImplementedException();
    }

    public async Task<CatalogCategory> GetById(int id)
    {
        var category = await _context.CatalogCategories.FindAsync(id);

        if (category == null) return null;

        return category;
    }

    public async Task<IEnumerable<CatalogCategory>> GetByName(string name)
    {
        var category = await _context.CatalogCategories
            .OrderByDescending(c => c.Name)
            .Where(c => c.Name.Contains(name.ToLower()))
            .ToListAsync();

        if (category == null) return null;

        return category;
    }

    public async Task<int> GetCount()
    {
        return await _context.CatalogCategories.CountAsync();
    }

    public async Task<bool> Update(int id, CatalogCategory CatalogCategory)
    {
        var CatalogCategoryId = await _context.CatalogCategories.FindAsync(id);

        if (CatalogCategoryId == null) return false;

        _context.CatalogCategories.Update(CatalogCategoryId);
        return await _context.SaveChangesAsync() > 0;
    }
}
public class CatalogCategoryDataResult
{
    public int TotalItems { get; set; }
    public IEnumerable<CatalogCategory> Items { get; set; }
}