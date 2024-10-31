using Catalog.API._02_Infrastructure.Data;
using Catalog.API._01_Services.Models;
using Microsoft.EntityFrameworkCore;
using Catalog.API.Controllers.Filters;

namespace Catalog.API._01_Services;
public interface ICatalogBrandService : IService<CatalogBrand, int>
{
    Task<IEnumerable<CatalogBrand>> GetByCategoryId(int id);
    Task<CatalogBrandDataResult> GetAll(GenericFilter filter);
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

    public async Task<CatalogBrandDataResult> GetAll(GenericFilter filter)
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

        var query = _context.CatalogBrands.AsQueryable();

        var data = await query
            .Skip(filter.PageIndex * filter.PageSize)
            .Take(filter.PageSize)
            .AsSplitQuery()
            .AsNoTracking()
            .ToListAsync();

        var totalItems = query.Count();

        return new CatalogBrandDataResult() { TotalItems = totalItems, Items = data };
    }

    public Task<IEnumerable<CatalogBrand>> GetAll()
    {
        throw new NotImplementedException();
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

    public async Task<IEnumerable<CatalogBrand>> GetByName(string name)
    {
        var brand = await _context.CatalogBrands
            .OrderByDescending(b => b.Name)
            .Where(b => b.Name.Contains(name.ToLower()))
            .ToListAsync();

        if (brand == null) return null;

        return brand;
    }

    public async Task<int> GetCount()
    {
        return await _context.CatalogBrands.CountAsync();
    }

    public async Task<bool> Update(int id, CatalogBrand CatalogBrand)
    {
        var brandId = await _context.CatalogBrands.FindAsync(id);

        if (brandId == null) return false;

        _context.CatalogBrands.Update(brandId);
        return await _context.SaveChangesAsync() > 0;
    }
}

public class CatalogBrandDataResult
{
    public int TotalItems { get; set; }
    public IEnumerable<CatalogBrand> Items { get; set; }
}
