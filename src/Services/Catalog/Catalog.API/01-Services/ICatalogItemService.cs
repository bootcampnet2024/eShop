using Catalog.API._02_Infrastructure.Data;
using Catalog.API._01_Services.Models;
using Microsoft.EntityFrameworkCore;

namespace Catalog.API._01_Services;
public interface ICatalogItemService : IService<CatalogItem, Guid>
{
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