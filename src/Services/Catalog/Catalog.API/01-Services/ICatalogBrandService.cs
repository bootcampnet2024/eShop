using Catalog.API._02_Infrastructure.Data;
using Catalog.API._01_Services.Models;
using Microsoft.EntityFrameworkCore;

namespace Catalog.API._01_Services;
public interface ICatalogBrandService : IService<CatalogBrand, int>
{
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