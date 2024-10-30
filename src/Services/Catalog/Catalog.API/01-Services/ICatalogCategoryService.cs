using Catalog.API._02_Infrastructure.Data;
using Catalog.API._01_Services.Models;
using Microsoft.EntityFrameworkCore;

namespace Catalog.API._01_Services;
public interface ICatalogCategoryService : IService<CatalogCategory, int>
{
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

    public async Task<IEnumerable<CatalogCategory>> GetAll()
    {
        var category = await _context.CatalogCategories.ToListAsync();

        if (category == null) return null;

        return category;
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