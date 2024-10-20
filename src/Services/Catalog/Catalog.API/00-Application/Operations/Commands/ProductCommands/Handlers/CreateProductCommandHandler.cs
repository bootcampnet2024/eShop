using Catalog.API._00_Application_Operations.Commands.ProductCommands;
using Catalog.API._01_Services;
using Catalog.API._01_Services.DTOs;
using MediatR;

namespace Catalog.API._00_Application.Operations.Commands.ProductCommands.Handlers
{
    public class CreateProductCommandHandler(ICatalogItemService repository, ICatalogBrandService brandService,
        ICatalogCategoryService categoryService) : IRequestHandler<CreateProductCommand, bool>
    {
        private readonly ICatalogItemService _productService = repository;
        private readonly ICatalogBrandService _productBrandService = brandService;
        private readonly ICatalogCategoryService _productCategoryService = categoryService;
        public async Task<bool> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
            var brand = await _productBrandService.GetById(request.Product.BrandId);
            var category = await _productCategoryService.GetById(request.Product.CategoryId);
            var createdAt = DateTime.UtcNow;

            if (brand == null || category == null) return false;

            var product = new CatalogItemDTO
            {
                Id = Guid.NewGuid(),
                Name = request.Product.Name,
                Description = request.Product.Description,
                Quantity = request.Product.Quantity,
                Price = request.Product.Price,
                Discount = request.Product.Discount,
                ImageURL = request.Product.ImageURL,
                IsActive = request.Product.IsActive,
                IsHighlighted = request.Product.IsHighlighted,
                Brand = brand.Name,
                Category = category.Name,
                CreatedAt = createdAt,
                UpdatedAt = createdAt
            };

            if (!product.IsActive) product.IsHighlighted = false;

            return await _productService.Add(product);
        }
    }
}
