using Catalog.API._02_Infrastructure.Data;
using Catalog.API.Application.Result;
using Catalog.API.Services.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Catalog.API.Services
{
    public interface ICatalogService
    {
        IEnumerable<CatalogItemDTO> GetAll();
    }

    public class CatalogService(ApplicationDataContext context) : ICatalogService
    {
        private readonly ApplicationDataContext _context = context;

        public IEnumerable<CatalogItemDTO> GetAll()
        {
            return _context.CatalogItems.Select(item => new CatalogItemDTO
            {
                Id = item.Id,
                Name = item.Name,
                Description = item.Description,
                Brand = item.Brand.Name,
                Price = item.Price
            }).AsNoTracking();
        }
    }
}
