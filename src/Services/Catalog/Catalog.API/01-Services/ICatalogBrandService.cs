using Catalog.API._02_Infrastructure.Data;
using Catalog.API.Services.Models;
using Microsoft.EntityFrameworkCore;

namespace Catalog.API.Services;
public interface ICatalogBrandService : IService<CatalogBrand, int>
{
    Task<IEnumerable<CatalogBrand>> GetByCategoryId(int id);
}

public class CatalogBrandService(ApplicationDataContext context) : ICatalogBrandService
{
    public readonly ApplicationDataContext _context = context;
    public async Task<bool> Add(CatalogBrand brand)
    {
        await _context.CatalogBrands.AddAsync(brand);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> Delete(int id)
    {
        var brand = await _context.CatalogBrands.FindAsync(id);

        if (brand == null) return false;

        _context.CatalogBrands.Remove(brand);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<IEnumerable<CatalogBrand>> GetAll()
    {
        return await _context.CatalogBrands.ToListAsync();
    }

    public async Task<CatalogBrand> GetById(int id)
    {
        var brand = await _context.CatalogBrands.FindAsync(id);

        if (brand == null) return null;

        return brand;
    }

    public async Task<IEnumerable<CatalogBrand>> GetByCategoryId(int id)
    {
        var category = await _context.CatalogCategories.FindAsync(id);
        if (category == null) return [];

        return await _context.CatalogItems
            .Where(x => x.Category.Id == id)
            .Select(x => x.Brand)
            .AsSplitQuery()
            .Distinct()
            .ToListAsync();
    }

    public Task<IEnumerable<CatalogBrand>> GetByName(string name)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> Update(int id, CatalogBrand CatalogBrand)
    {
        var brandId = await _context.CatalogBrands.FindAsync(id);

        if (brandId == null) return false;

        _context.CatalogBrands.Update(brandId);
        return await _context.SaveChangesAsync() > 0;
    }
}
