using Catalog.API.Application.Result;
using Catalog.API.Services.DTOs;

namespace Catalog.API.Application.Extensions
{
    public static class ResultConverterExtension
    {
        public static IEnumerable<CatalogItemsResult> ToCatalogItemsResult(this IEnumerable<CatalogItemDTO> items)
        {
            return items.Select(items => items.ToCatalogItemsResult());
        }

        public static CatalogItemsResult ToCatalogItemsResult(this CatalogItemDTO catalogItemDTO)
        {
            return new CatalogItemsResult
            {
                Id = catalogItemDTO.Id,
                Name = catalogItemDTO.Name,
                Description = catalogItemDTO.Description,
                Brand = catalogItemDTO.Brand,
                Price = catalogItemDTO.Price
            };
        }
    }
}
