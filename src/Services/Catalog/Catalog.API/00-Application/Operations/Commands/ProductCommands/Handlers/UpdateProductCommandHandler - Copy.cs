using Catalog.API._00_Application_Operations.Commands.ProductCommands;
using Catalog.API._01_Services;
using MediatR;

namespace Catalog.API._00_Application.Operations.Commands.ProductCommands.Handlers
{
    public class EnableOrDisableProductCommandHandler(ICatalogItemService repository, ICatalogBrandService brandService,
        ICatalogCategoryService categoryService) : IRequestHandler<UpdateProductCommand, bool>
    {
        private readonly ICatalogItemService _productService = repository;
        private readonly ICatalogBrandService _productBrandService = brandService;
        private readonly ICatalogCategoryService _productCategoryService = categoryService;
        public async Task<bool> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
        {
            var brand = await _productBrandService.GetById(request.Product.BrandId);
            var category = await _productCategoryService.GetById(request.Product.CategoryId);
            var product = await _productService.GetById(request.Id);

            if (product == null || brand == null || category == null) return false;


            product.Name = request.Product.Name;
            product.Description = request.Product.Description;
            product.Quantity = request.Product.Quantity;
            product.Price = request.Product.Price;
            product.Discount = request.Product.Discount;
            product.ImageURL = request.Product.ImageURL;
            product.IsActive = request.Product.IsActive;
            product.IsHighlighted = request.Product.IsHighlighted;
            if (!request.Product.IsActive) product.IsHighlighted = false;
            product.Brand = brand.Name;
            product.Category = category.Name;
            product.UpdatedAt = DateTime.UtcNow;

            return await _productService.Update(product);
        }
    }
}
