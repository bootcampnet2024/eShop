using Catalog.API._00_Application.Models.Requests;
using Catalog.API._00_Application.Operations.Commands.BrandCommands;
using Catalog.API._00_Application.Operations.Queries.BrandQueries;
using Catalog.API.Controllers;
using Catalog.API._01_Services.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Catalog.API._01_Services;
using Catalog.API.Controllers.Filters;

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
            var brands = new CatalogBrandDataResult();
            _mediatorMock.Setup(m => m.Send(It.IsAny<GetAllBrandsQuery>(), It.IsAny<CancellationToken>()))
                  .ReturnsAsync(brands);

            var filter = new GenericFilter()
            {
                PageIndex = 1,
                PageSize = 1,
            };

            var result = await _brandController.GetAll(filter);

            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(brands, okResult.Value);
        }

        [TestMethod]
        public async Task GetById_ReturnsOkWithBrand_WhenBrandExists()
        {
            var brandId = 1;
            var brand = new CatalogBrand { Id = brandId };
            _mediatorMock.Setup(m => m.Send(It.IsAny<GetBrandByIdQuery>(), It.IsAny<CancellationToken>()))
                         .ReturnsAsync(brand);

            var result = await _brandController.GetById(brandId);

            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(brand, okResult.Value);
        }

        [TestMethod]
        public async Task GetByName_ReturnsOkWithBrands_WhenBrandExists()
        {
            var brandName = "test";
            var brands = new List<CatalogBrand> { new CatalogBrand{ Name = "test"}, new CatalogBrand{ Name = "test2"} };
            _mediatorMock.Setup(m => m.Send(It.IsAny<GetBrandsByNameQuery>(), It.IsAny<CancellationToken>()))
                         .ReturnsAsync(brands);

            var result = await _brandController.GetByName(brandName);

            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(brands, okResult.Value);
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
