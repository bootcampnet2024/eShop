﻿using Catalog.API._01_Services.DTOs;
using Catalog.API._01_Services.Models;
using Catalog.API._02_Infrastructure.Data;
using Catalog.API.Controllers.Filters;
using Microsoft.EntityFrameworkCore;

namespace Catalog.API._01_Services;
public interface ICatalogBrandService : IService<CatalogBrandDTO, int>
{
    Task<IEnumerable<CatalogBrandDTO>> GetByCategoryId(int id);
}

public class CatalogBrandService(ApplicationDataContext context) : ICatalogBrandService
{
    public readonly ApplicationDataContext _context = context;
    public async Task<bool> Add(CatalogBrandDTO dto)
    {
        var model = new CatalogBrand()
        {
            Name = dto.Name,
            ImageURL = dto.ImageURL,
            CreatedAt = dto.CreatedAt,
            UpdatedAt = dto.UpdatedAt
        };

        await _context.CatalogBrands.AddAsync(model);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> Disable(int id)
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

    public async Task<CatalogDataDTO<CatalogBrandDTO>> GetAll(GenericFilter filter)
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
            .Select(x => CatalogBrandDTO.FromModel(x))
            .ToListAsync();

        var totalItems = query.Count();

        return new CatalogDataDTO<CatalogBrandDTO>() { TotalItems = totalItems, Items = data };
    }

    public async Task<IEnumerable<CatalogBrandDTO>> GetByCategoryId(int id)
    {
        var category = await _context.CatalogCategories.FindAsync(id);

        if (category == null) return [];

        return await _context.CatalogItems
            .Where(x => x.Category.Id == id)
            .Select(x => CatalogBrandDTO.FromModel(x.Brand))
            .AsSplitQuery()
            .Distinct()
            .ToListAsync();
    }

    public async Task<CatalogBrandDTO> GetById(int id)
    {
        var brand = await _context.CatalogBrands.FindAsync(id);

        if (brand == null) return null;

        return CatalogBrandDTO.FromModel(brand);
    }

    public async Task<CatalogDataDTO<CatalogBrandDTO>> GetByName(string name, GenericFilter filter)
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

        var query = _context.CatalogBrands.AsQueryable().Where(b => b.Name.Contains(name.ToLower()));

        var data = await query
            .Skip(filter.PageIndex * filter.PageSize)
            .Take(filter.PageSize)
            .AsSplitQuery()
            .AsNoTracking()
            .Select(x => CatalogBrandDTO.FromModel(x))
            .ToListAsync();

        var totalItems = query.Count();

        return new CatalogDataDTO<CatalogBrandDTO>() { TotalItems = totalItems, Items = data };
    }

    public async Task<int> GetCount()
    {
        return await _context.CatalogBrands.CountAsync();
    }

    public async Task<bool> Update(CatalogBrandDTO dto)
    {
        var model = _context.CatalogBrands.Find(dto.Id);
        if (model == null) return false;

        model.Name = dto.Name;
        model.ImageURL = dto.ImageURL;
        model.UpdatedAt = dto.UpdatedAt;

        _context.CatalogBrands.Update(model);
        return await _context.SaveChangesAsync() > 0;
    }
}
