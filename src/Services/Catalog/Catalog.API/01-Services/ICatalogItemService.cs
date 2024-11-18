using Catalog.API._01_Services.DTOs;
using Catalog.API._01_Services.Models;
using Catalog.API._02_Infrastructure.Data;
using Catalog.API.Controllers.Filters;
using Microsoft.EntityFrameworkCore;
using Catalog.API.Controllers.Filters;
using Microsoft.EntityFrameworkCore;

namespace Catalog.API._01_Services;
public interface ICatalogItemService : IService<CatalogItemDTO, Guid>
{
    Task<bool> UpdateQuantity(Guid id, int quantity);
}
public class CatalogItemService(ApplicationDataContext context) : ICatalogItemService
{
    public readonly ApplicationDataContext _context = context;
    public async Task<bool> Add(CatalogItemDTO dto)
    {
        var brand = await _context.CatalogBrands.FirstOrDefaultAsync(x => x.Name == dto.Brand);
        var category = await _context.CatalogCategories.FirstOrDefaultAsync(x => x.Name == dto.Category);

        var model = new CatalogItem()
        {
            Name = dto.Name,
            Description = dto.Description,
            Price = dto.Price,
            Discount = dto.Discount,
            Quantity = dto.Quantity,
            ImageURL = dto.ImageURL,
            CreatedAt = dto.CreatedAt,
            UpdatedAt = dto.UpdatedAt,
            IsActive = dto.IsActive,
            IsHighlighted = dto.IsHighlighted,
            Brand = brand,
            Category = category,
        };

        await _context.CatalogItems.AddAsync(model);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> Disable(Guid id)
    {
        var product = await _context.CatalogItems.FindAsync(id);

        if (product == null) return false;

        if (product.IsActive)
        {
            product.IsActive = false;
            product.IsHighlighted = false;
        }
        else product.IsActive = true;

        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<CatalogDataDTO<CatalogItemDTO>> GetAll(GenericFilter filter)
    {
        var catalogFilter = (CatalogItemsFilter)filter;

        catalogFilter ??= new CatalogItemsFilter()
        {
            ShowOnlyHighlighted = false,
            PageIndex = 0,
            PageSize = 20,
            BrandsIds = [],
            CategoriesIds = [],
            FilterOrder = OrderBy.None
        };

        if (catalogFilter.PageSize <= 0)
            catalogFilter.PageSize = 10;

        if (catalogFilter.PageSize > 50)
            catalogFilter.PageSize = 50;

        var query = _context.CatalogItems.AsQueryable();

        query = query.Where(w => (!catalogFilter.ShowOnlyHighlighted || w.IsHighlighted));

        var categoriesIds = _context.CatalogCategories.Where(w => catalogFilter.CategoriesIds.Contains(w.Id)).Select(w => w.Id);

        var brandsIds = _context.CatalogBrands.Where(w => catalogFilter.BrandsIds.Contains(w.Id)).Select(w => w.Id);

        query = query.Where(w => (!categoriesIds.Any() || categoriesIds.Contains(w.Category.Id)));

        query = query.Where(w => (!brandsIds.Any() || brandsIds.Contains(w.Brand.Id)));

        if (catalogFilter.FilterOrder == OrderBy.None) query = query.OrderByDescending(w => w.IsHighlighted).OrderByDescending(w => w.UpdatedAt);

        if (catalogFilter.FilterOrder == OrderBy.LowestPrice) query = query.OrderBy(w => w.Price);

        if (catalogFilter.FilterOrder == OrderBy.HighestPrice) query = query.OrderByDescending(w => w.Price);

        if (catalogFilter.FilterOrder == OrderBy.Latest) query = query.OrderByDescending(w => w.UpdatedAt);

        var data = await query
            .Skip(catalogFilter.PageIndex * catalogFilter.PageSize)
            .Take(catalogFilter.PageSize)
            .Include(x => x.Brand)
            .Include(x => x.Category)
            .AsSplitQuery()
            .AsNoTracking()
            .Select(x => CatalogItemDTO.FromModel(x))
            .ToListAsync();

        var totalItems = query.Count();

        return new CatalogDataDTO<CatalogItemDTO> { TotalItems = totalItems, Items = data };
    }

    public async Task<CatalogItemDTO> GetById(Guid id)
    {
        var product = await _context.CatalogItems.FindAsync(id);

        if (product == null) return null;

        await _context.Entry(product).Reference(p => p.Category).LoadAsync();
        await _context.Entry(product).Reference(p => p.Brand).LoadAsync();

        return CatalogItemDTO.FromModel(product);
    }

    public async Task<CatalogDataDTO<CatalogItemDTO>> GetByName(string name, GenericFilter filter)
    {
        var catalogFilter = (CatalogItemsFilter)filter;

        catalogFilter ??= new CatalogItemsFilter()
        {
            ShowOnlyHighlighted = false,
            PageIndex = 0,
            PageSize = 20,
            BrandsIds = [],
            CategoriesIds = [],
            FilterOrder = OrderBy.None
        };

        if (catalogFilter.PageSize <= 0)
            catalogFilter.PageSize = 10;

        if (catalogFilter.PageSize > 50)
            catalogFilter.PageSize = 50;

        var query = _context.CatalogItems.AsQueryable().Where(p => p.Name.ToLower().Contains(name.ToLower()));

        query = query.Where(w => (!catalogFilter.ShowOnlyHighlighted || w.IsHighlighted));

        var categoriesIds = _context.CatalogCategories.Where(w => catalogFilter.CategoriesIds.Contains(w.Id)).Select(w => w.Id);

        var brandsIds = _context.CatalogBrands.Where(w => catalogFilter.BrandsIds.Contains(w.Id)).Select(w => w.Id);

        query = query.Where(w => (!categoriesIds.Any() || categoriesIds.Contains(w.Category.Id)));

        query = query.Where(w => (!brandsIds.Any() || brandsIds.Contains(w.Brand.Id)));

        if (catalogFilter.FilterOrder == OrderBy.None) query = query.OrderByDescending(w => w.IsHighlighted).OrderByDescending(w => w.UpdatedAt);

        if (catalogFilter.FilterOrder == OrderBy.LowestPrice) query = query.OrderBy(w => w.Price);

        if (catalogFilter.FilterOrder == OrderBy.HighestPrice) query = query.OrderByDescending(w => w.Price);

        if (catalogFilter.FilterOrder == OrderBy.Latest) query = query.OrderByDescending(w => w.UpdatedAt);

        var data = await query
            .Skip(catalogFilter.PageIndex * catalogFilter.PageSize)
            .Take(catalogFilter.PageSize)
            .Include(x => x.Brand)
            .Include(x => x.Category)
            .AsSplitQuery()
            .AsNoTracking()
            .Select(x => CatalogItemDTO.FromModel(x))
            .ToListAsync();

        var totalItems = query.Count();

        return new CatalogDataDTO<CatalogItemDTO> { TotalItems = totalItems, Items = data };
    }

    public async Task<int> GetCount()
    {
        return await _context.CatalogItems.CountAsync();
    }

    public async Task<bool> Update(CatalogItemDTO dto)
    {
        var model = _context.CatalogItems.Find(dto.Id);
        if (model == null) return false;

        var brand = await _context.CatalogBrands.FirstOrDefaultAsync(x => x.Name == dto.Brand);
        var category = await _context.CatalogCategories.FirstOrDefaultAsync(x => x.Name == dto.Category);

        model.Name = dto.Name;
        model.Description = dto.Description;
        model.Price = dto.Price;
        model.Discount = dto.Discount;
        model.Quantity = dto.Quantity;
        model.ImageURL = dto.ImageURL;
        model.IsActive = dto.IsActive;
        model.IsHighlighted = dto.IsHighlighted;
        model.UpdatedAt = dto.UpdatedAt;
        model.Brand = brand;
        model.Category = category;

        _context.CatalogItems.Update(model);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> UpdateQuantity(Guid id, int quantity)
    {
        var product = await _context.CatalogItems.FindAsync(id);

        if (product == null) return false;

        product.Quantity = quantity;

        return await _context.SaveChangesAsync() > 0;
    }
}