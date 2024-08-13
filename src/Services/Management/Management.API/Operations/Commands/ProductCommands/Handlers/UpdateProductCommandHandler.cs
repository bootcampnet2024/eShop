using Management.Domain.Repositories;
using Management.Infrastructure.Repositories;
using MediatR;

namespace Management.API.Operations.Commands.ProductCommands.Handlers
{
    public class UpdateProductCommandHandler(IProductRepository repository, IBrandRepository brandRepository,
        ICategoryRepository categoryRepository) : IRequestHandler<UpdateProductCommand, bool>
    {
        private readonly IProductRepository _productRepository = repository;
        private readonly IBrandRepository _productBrandRepository = brandRepository;
        private readonly ICategoryRepository _productCategoryRepository = categoryRepository;
        public async Task<bool> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
        {
            var brand = await _productBrandRepository.GetById(request.Product.BrandId);
            var category = await _productCategoryRepository.GetById(request.Product.CategoryId);
            var product = await _productRepository.GetById(request.Id);

            if (product == null) return false;

            product.Name = request.Product.Name;
            product.Description = request.Product.Description;
            product.Quantity = request.Product.Quantity;
            product.Price = request.Product.Price;
            product.ImageURL = request.Product.ImageURL;
            product.IsActive = request.Product.IsActive;
            product.Brand = brand;
            product.Category = category;

            return await _productRepository.Update(product.Id, product);
        }
    }
}
