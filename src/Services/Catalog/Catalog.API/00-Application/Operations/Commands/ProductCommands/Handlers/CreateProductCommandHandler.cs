using Catalog.API._00_Application_Operations.Commands.ProductCommands;
using Catalog.API.Services;
using Catalog.API.Services.Models;
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

            var product = new CatalogItem
            {
                Id = Guid.NewGuid(),
                Name = request.Product.Name,
                Description = request.Product.Description,
                Quantity = request.Product.Quantity,
                Price = request.Product.Price,
                ImageURL = request.Product.ImageURL,
                IsActive = true,
                IsHighlighted = false,
                Brand = brand,
                Category = category
            };

            return await _productService.Add(product);
        }
    }
}
