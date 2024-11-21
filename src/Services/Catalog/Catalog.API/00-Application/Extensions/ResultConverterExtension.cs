using Catalog.API._00_Application.Result;
using Catalog.API._01_Services.DTOs;

namespace Catalog.API._00_Application.Extensions
{
    public static class ResultConverterExtension
    {
        public static IEnumerable<CatalogCategoryResult> ToCatalogCategoryResult(this IEnumerable<CatalogCategoryDTO> categories)
        {
            return categories.Select(category => category.ToCatalogCategoryResult());
        }

        public static CatalogCategoryResult ToCatalogCategoryResult(this CatalogCategoryDTO categoryDto)
        {
            return new CatalogCategoryResult
            {
                Id = categoryDto.Id,
                Name = categoryDto.Name,
            };
        }

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
                Category = catalogItemDTO.Category,
                Brand = catalogItemDTO.Brand,
                Price = catalogItemDTO.Price
            };
        }
    }
}
