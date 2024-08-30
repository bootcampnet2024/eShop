using Management.API.Controllers;
using Management.API.Models.Requests;
using Management.API.Operations.Commands.ProductCommands;
using Management.API.Operations.Queries.ProductQueries;
using Management.Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace Management.UnitTests.Controller
{
    public class ProductControllerTest
    {
        private readonly Mock<IMediator> _mediatorMock;
        private readonly ProductsController _productController;

        public ProductControllerTest()
        {
            _mediatorMock = new Mock<IMediator>();
            _productController = new ProductsController(_mediatorMock.Object);
        }

        [Fact]
        public async Task Add_ReturnsOk_WhenProductCreationSucceds()
        {
            var product = new CreateProductRequest
            {
                Name = "Test",
                Description = "Test",
                Quantity = 10,
                Price = 99.99,
                ImageURL = "http://example.com/image.png",
            };

            _mediatorMock.Setup(m => m.Send(It.IsAny<CreateProductCommand>(), It.IsAny<CancellationToken>()))
                    .ReturnsAsync(true);

            var result = await _productController.Add(product);

            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task GetAll_ReturnsOkWithProducts_WhenProductsExits()
        {
            var products = new List<Product> { new Product(), new Product()};
            _mediatorMock.Setup(m => m.Send(It.IsAny<GetAllProductsQuery>(), It.IsAny<CancellationToken>()))
                  .ReturnsAsync(products);

            var result = await _productController.GetAll(); 

            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(products, okResult.Value);
        }

        [Fact]
        public async Task Delete_ReturnsOk_WhenProductIsDeleted()
        {
            var productId = Guid.NewGuid();
            _mediatorMock.Setup(m => m.Send(It.IsAny<DeleteProductCommand>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(true);

            var result = await _productController.Delete(productId);

            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async Task GetById_ReturnsOkWithProduct_WhenProductExists()
        {
            var productId = Guid.NewGuid();
            var product = new Product { Id = productId };
            _mediatorMock.Setup(m => m.Send(It.IsAny<GetProductsByIdQuery>(), It.IsAny<CancellationToken>()))
                         .ReturnsAsync(product);

            var result = await _productController.GetById(productId);

            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(product, okResult.Value);
        }

        [Fact]
        public async Task GetByName_ReturnsOkWithProduct_WhenProductExists()
        {
            var product = new Product
            {
                Id = Guid.NewGuid(),
                Name = "Test",
                Description = "Test",
                Quantity = 1,
                Price = 1,
                ImageURL = "abc",
                IsActive = true,
                Brand = new Brand { Id = 1, Name = "Test" },
                Category = new Category {  Id = 1, Name = "Test" }
            };

            var products = new List<Product> { product };

            _mediatorMock.Setup(m => m.Send(It.IsAny<GetProductsByNameQuery>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(products);

            var result = await _productController.SearchByName("Test");

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedProducts = Assert.IsAssignableFrom<IEnumerable<Product>>(okResult.Value);
            Assert.Single(returnedProducts);
            Assert.Equal(product.Name, returnedProducts.First().Name);
        }

        [Fact]
        public async Task Update_ReturnsOk_WhenProductUpdateSucceeds()
        {
            var productId = Guid.NewGuid();
            var request = new UpdateProductRequest
            {
                Name = "Updated Product",
                Description = "An updated product",
                Quantity = 20,
                Price = 199.99,
                ImageURL = "http://example.com/updated_image.png",
                BrandId = 1,
                CategoryId = 1
            };

            _mediatorMock.Setup(m => m.Send(It.IsAny<UpdateProductCommand>(), It.IsAny<CancellationToken>()))
                         .ReturnsAsync(true);

            var result = await _productController.Update(productId, request);

            Assert.IsType<OkObjectResult>(result);
        }
    }
}
