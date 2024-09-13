using Catalog.API._00_Application.Models.Requests;
using Catalog.API._00_Application.Operations.Queries.ProductQueries;
using Catalog.API._00_Application_Operations.Commands.ProductCommands;
using Catalog.API.Controllers;
using Catalog.API.Services.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace Catalog.UnitTests.Controllers
{
    [TestClass]
    public class ProductControllerTest
    {
        private readonly Mock<IMediator> _mediatorMock;
        private readonly ProductsController _productController;

        public ProductControllerTest()
        {
            _mediatorMock = new Mock<IMediator>();
            _productController = new ProductsController(_mediatorMock.Object);
        }

        [TestMethod]
        public async Task Add_ReturnsOk_WhenProductCreationSucceds()
        {
            var product = new CreateProductRequest
            {
                Name = "Test",
                Description = "Test",
                Quantity = 10,
                Price = 99,
                ImageURL = "http://example.com/image.png",
            };

            _mediatorMock.Setup(m => m.Send(It.IsAny<CreateProductCommand>(), It.IsAny<CancellationToken>()))
                    .ReturnsAsync(true);

            var result = await _productController.Add(product);

            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        [TestMethod]
        public async Task GetAll_ReturnsOkWithProducts_WhenProductsExits()
        {
            var products = new List<CatalogItem> { new CatalogItem(), new CatalogItem() };
            _mediatorMock.Setup(m => m.Send(It.IsAny<GetAllProductsQuery>(), It.IsAny<CancellationToken>()))
                  .ReturnsAsync(products);

            var result = await _productController.GetAll();

            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(products, okResult.Value);
        }

        [TestMethod]
        public async Task Delete_ReturnsOk_WhenProductIsDeleted()
        {
            var productId = Guid.NewGuid();
            _mediatorMock.Setup(m => m.Send(It.IsAny<DeleteProductCommand>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(true);

            var result = await _productController.Delete(productId);

            Assert.IsInstanceOfType(result, typeof(OkResult));
        }

        [TestMethod]
        public async Task GetById_ReturnsOkWithProduct_WhenProductExists()
        {
            var productId = Guid.NewGuid();
            var product = new CatalogItem { Id = productId };
            _mediatorMock.Setup(m => m.Send(It.IsAny<GetProductsByIdQuery>(), It.IsAny<CancellationToken>()))
                         .ReturnsAsync(product);

            var result = await _productController.GetById(productId);

            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(product, okResult.Value);
        }

        [TestMethod]
        public async Task GetByName_ReturnsOkWithProduct_WhenProductExists()
        {
            var product = new CatalogItem
            {
                Id = Guid.NewGuid(),
                Name = "Test",
                Description = "Test",
                Quantity = 1,
                Price = 1,
                ImageURL = "abc",
                IsActive = true,
                Brand = new CatalogBrand { Id = 1, Name = "Test" },
                Category = new CatalogCategory { Id = 1, Name = "Test" }
            };

            var products = new List<CatalogItem> { product };

            _mediatorMock.Setup(m => m.Send(It.IsAny<GetProductsByNameQuery>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(products);

            var result = await _productController.SearchByName("Test");

            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            var returnedProducts = okResult.Value as IEnumerable<CatalogItem>;
            Assert.IsNotNull(returnedProducts);
            Assert.AreEqual(1, returnedProducts.Count());
            Assert.AreEqual(product.Name, returnedProducts.First().Name);
        }

        [TestMethod]
        public async Task Update_ReturnsOk_WhenProductUpdateSucceeds()
        {
            var productId = Guid.NewGuid();
            var request = new UpdateProductRequest
            {
                Name = "Updated Product",
                Description = "An updated product",
                Quantity = 20,
                Price = 199,
                ImageURL = "http://example.com/updated_image.png",
                BrandId = 1,
                CategoryId = 1
            };

            _mediatorMock.Setup(m => m.Send(It.IsAny<UpdateProductCommand>(), It.IsAny<CancellationToken>()))
                         .ReturnsAsync(true);

            var result = await _productController.Update(productId, request);

            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }
    }
}
