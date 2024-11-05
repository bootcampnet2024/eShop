using Catalog.API._01_Services.DTOs;
using Catalog.API._01_Services.Models;
using Catalog.API._02_Infrastructure.Data;
using Catalog.API.Controllers.Filters;
using Microsoft.EntityFrameworkCore;

namespace Catalog.API._01_Services;
public interface ICatalogCategoryService : IService<CatalogCategoryDTO, int>
{
}
public class CatalogCategoryService(ApplicationDataContext context) : ICatalogCategoryService
{
    public readonly ApplicationDataContext _context = context;
    public async Task<bool> Add(CatalogCategoryDTO dto)
    {
        var model = new CatalogCategory()
        {
            Name = dto.Name,
            Description = dto.Description,
            ImageURL = dto.ImageURL,
            CreatedAt = dto.CreatedAt,
            UpdatedAt = dto.UpdatedAt
        };

        await _context.CatalogCategories.AddAsync(model);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> Delete(int id)
    {
        var CatalogCategory = await _context.CatalogCategories.FindAsync(id);

        if (CatalogCategory == null) return false;

        _context.CatalogCategories.Remove(CatalogCategory);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<CatalogDataDTO<CatalogCategoryDTO>> GetAll(GenericFilter filter)
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
            .Select(x => CatalogCategoryDTO.FromModel(x))
            .ToListAsync();

        var totalItems = query.Count();

        return new CatalogDataDTO<CatalogCategoryDTO> { TotalItems = totalItems, Items = data };
    }

    public async Task<CatalogCategoryDTO> GetById(int id)
    {
        var category = await _context.CatalogCategories.FindAsync(id);

        if (category == null) return null;

        return CatalogCategoryDTO.FromModel(category);
    }

    public async Task<CatalogDataDTO<CatalogCategoryDTO>> GetByName(string name, GenericFilter filter)
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

        var query = _context.CatalogCategories.AsQueryable().Where(c => c.Name.Contains(name.ToLower()));

        var data = await query
            .Skip(filter.PageIndex * filter.PageSize)
            .Take(filter.PageSize)
            .AsSplitQuery()
            .AsNoTracking()
            .Select(x => CatalogCategoryDTO.FromModel(x))
            .ToListAsync();

        var totalItems = query.Count();

        return new CatalogDataDTO<CatalogCategoryDTO> { TotalItems = totalItems, Items = data };
    }

    public async Task<int> GetCount()
    {
        return await _context.CatalogCategories.CountAsync();
    }

    public async Task<bool> Update(CatalogCategoryDTO dto)
    {
        var model = _context.CatalogCategories.Find(dto.Id);
        if (model == null) return false;

        model.Name = dto.Name;
        model.ImageURL = dto.ImageURL;
        model.Description = dto.Description;
        model.UpdatedAt = dto.UpdatedAt;

        _context.CatalogCategories.Update(model);
        return await _context.SaveChangesAsync() > 0;
    }
}