using Management.Domain.Models;
using Management.Domain.Repositories;
using MediatR;

namespace Management.API.Operations.Commands.ProductCommands.Handlers
{
    public class CreateProductCommandHandler(IProductRepository repository, IBrandRepository brandRepository, ICategoryRepository categoryRepository) : IRequestHandler<CreateProductCommand, bool>
    {
        private readonly IProductRepository _productRepository = repository;
        private readonly IBrandRepository _productBrandRepository = brandRepository;
        private readonly ICategoryRepository _productCategoryRepository = categoryRepository;
        public async Task<bool> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
            var brand = await _productBrandRepository.GetById(request.Product.BrandId);
            var category = await _productCategoryRepository.GetById(request.Product.CategoryId);

            var product = new Product
            {
                Id = Guid.NewGuid(),
                Name = request.Product.Name,
                Description = request.Product.Description,
                Quantity = request.Product.Quantity,
                Price = request.Product.Price,
                ImageURL = request.Product.ImageURL,
                IsActive = true,
                Brand = brand,
                Category = category
            };

            return await _productRepository.Add(product);
        }
    }
}
