using Catalog.API._02_Infrastructure.Data;
using Catalog.API.Application.Result;
using Catalog.API.Services.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Catalog.API.Services
{
    public interface ICatalogService
    {
        CatalogItemDataResult GetAll(CatalogItemFilter filter);
    }

    public class CatalogService(ApplicationDataContext context) : ICatalogService
    {
        private readonly ApplicationDataContext _context = context;

        public CatalogItemDataResult GetAll(CatalogItemFilter filter)
        {
            filter ??= new CatalogItemFilter() { PageIndex = 0, PageSize = 10, ShowOnlyHighlighted = true };

            var totalItems = _context.CatalogItems.Count(w => w.IsHighlighted == filter.ShowOnlyHighlighted);

            var data = _context.CatalogItems
                .Where(w => w.IsHighlighted == filter.ShowOnlyHighlighted)
                .Skip(filter.PageIndex * filter.PageSize)
                .Take(filter.PageSize)
                .AsNoTracking()
                .Select(item => new CatalogItemDTO
                {
                    Id = item.Id,
                    Name = item.Name,
                    Description = item.Description,
                    Brand = item.Brand.Name,
                    Price = item.Price
                });

            return new CatalogItemDataResult() { TotalItems = totalItems, Items = data };
        }
    }

    public class CatalogItemFilter
    {
        public bool ShowOnlyHighlighted { get; set; }
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
    }

    public class CatalogItemDataResult
    {
        public int TotalItems { get; set; }
        public IEnumerable<CatalogItemDTO> Items { get; set; }
    }
}

