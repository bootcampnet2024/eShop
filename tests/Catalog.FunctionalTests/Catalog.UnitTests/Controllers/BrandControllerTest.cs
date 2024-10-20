using Catalog.API._00_Application.Models.Requests;
using Catalog.API._00_Application.Operations.Commands.BrandCommands;
using Catalog.API._00_Application.Operations.Queries.BrandQueries;
using Catalog.API._01_Services.DTOs;
using Catalog.API.Controllers;
using Catalog.API.Controllers.Filters;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace Catalog.UnitTests.Controllers
{
    [TestClass]
    public class BrandControllerTest
    {
        private readonly Mock<IMediator> _mediatorMock;
        private readonly BrandsController _brandController;

        public BrandControllerTest()
        {
            _mediatorMock = new Mock<IMediator>();
            _brandController = new BrandsController(_mediatorMock.Object);
        }

        [TestMethod]
        public async Task Add_ReturnsOk_WhenBrandCreationSucceeds()
        {
            var brand = new CreateBrandRequest { Name = "Test" };
            _mediatorMock.Setup(m => m.Send(It.IsAny<CreateBrandCommand>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(true);

            var result = await _brandController.Add(brand);

            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        [TestMethod]
        public async Task GetAll_ReturnsOkWithBrands_WhenBrandExists()
        {
            var brandsDTO = new CatalogDataDTO<CatalogBrandDTO>()
            {
                TotalItems = 2,
                Items = new List<CatalogBrandDTO>
                {   
                    new CatalogBrandDTO { Name = "Teste1" },
                    new CatalogBrandDTO { Name = "Teste2" }  
                }
            };
            _mediatorMock.Setup(m => m.Send(It.IsAny<GetAllBrandsQuery>(), It.IsAny<CancellationToken>()))
                  .ReturnsAsync(brandsDTO);

            var filter = new GenericFilter()
            {
                PageIndex = 0,
                PageSize = 1,
            };

            var result = await _brandController.GetAll(filter);

            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
        }

        [TestMethod]
        public async Task GetById_ReturnsOkWithBrand_WhenBrandExists()
        {
            var brandId = 1;
            var brandDTO = new CatalogBrandDTO { Id = brandId };
            _mediatorMock.Setup(m => m.Send(It.IsAny<GetBrandByIdQuery>(), It.IsAny<CancellationToken>()))
                         .ReturnsAsync(brandDTO);

            var result = await _brandController.GetById(brandId);

            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
        }

        [TestMethod]
        public async Task GetByName_ReturnsOkWithBrands_WhenBrandExists()
        {
            var brandName = "test";
            var brandsDTO = new CatalogDataDTO<CatalogBrandDTO>()
            {
                TotalItems = 2,
                Items = new List<CatalogBrandDTO>
                {
                    new CatalogBrandDTO { Name = "Teste1" },
                    new CatalogBrandDTO { Name = "Teste2" }
                }
            };
            _mediatorMock.Setup(m => m.Send(It.IsAny<GetBrandsByNameQuery>(), It.IsAny<CancellationToken>()))
                         .ReturnsAsync(brandsDTO);

            var filter = new GenericFilter()
            {
                PageIndex = 0,
                PageSize = 1,
            };

            var result = await _brandController.GetByName(brandName, filter);

            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
        }

        [TestMethod]
        public async Task Update_ReturnsOk_WhenBrandUpdateSucceeds()
        {
            var brandId = 1;
            var request = new UpdateBrandRequest
            {
                Name = "Test"
            };

            _mediatorMock.Setup(m => m.Send(It.IsAny<UpdateBrandCommand>(), It.IsAny<CancellationToken>()))
                         .ReturnsAsync(true);

            var result = await _brandController.Update(brandId, request);

            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }
    }
}
