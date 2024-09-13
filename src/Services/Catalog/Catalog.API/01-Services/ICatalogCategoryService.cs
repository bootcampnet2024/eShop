using Catalog.API._02_Infrastructure.Data;
using Catalog.API.Services.Models;
using Microsoft.EntityFrameworkCore;

namespace Catalog.API.Services;
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
        return await _context.CatalogCategories.ToListAsync();
    }

    public async Task<CatalogCategory> GetById(int id)
    {
        var category = await _context.CatalogCategories.FindAsync(id);

        if (category == null) return null;

        return category;
    }

    public Task<IEnumerable<CatalogCategory>> GetByName(string name)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> Update(int id, CatalogCategory CatalogCategory)
    {
        var CatalogCategoryId = await _context.CatalogCategories.FindAsync(id);

        if (CatalogCategoryId == null) return false;

        _context.CatalogCategories.Update(CatalogCategoryId);
        return await _context.SaveChangesAsync() > 0;
    }
}