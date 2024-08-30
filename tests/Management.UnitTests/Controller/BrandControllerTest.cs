using Management.API.Controllers;
using Management.API.Models.Requests;
using Management.API.Operations.Commands.BrandCommands;
using Management.API.Operations.Queries.BrandQueries;
using Management.Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Management.UnitTests.Controller
{
    public class BrandControllerTest
    {
        private readonly Mock<IMediator> _mediatorMock;
        private readonly BrandsController _brandController;

        public BrandControllerTest()
        {
            _mediatorMock = new Mock<IMediator>();
            _brandController = new BrandsController(_mediatorMock.Object);
        }

        [Fact]
        public async Task Add_ReturnsOk_WhenBrandCreationSucceds()
        {
            var brand = new CreateBrandRequest { Name = "Test" };
            _mediatorMock.Setup(m => m.Send(It.IsAny<CreateBrandCommand>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(true);

            var result = await _brandController.Add(brand);

            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task GetAll_ReturnsOkWithCateg_WhenBrandExists()
        {
            var brands = new List<Brand> { new Brand(), new Brand() };
            _mediatorMock.Setup(m => m.Send(It.IsAny<GetAllBrandsQuery>(), It.IsAny<CancellationToken>()))
                  .ReturnsAsync(brands);

            var result = await _brandController.GetAll();

            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(brands, okResult.Value);
        }

        [Fact]
        public async Task GetById_ReturnsOkWithCategory_WhenBrandExists()
        {
            var brandId = 1;
            var brand = new Brand { Id = brandId };
            _mediatorMock.Setup(m => m.Send(It.IsAny<GetBrandsByIdQuery>(), It.IsAny<CancellationToken>()))
                         .ReturnsAsync(brand);

            var result = await _brandController.GetById(brandId);

            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(brand, okResult.Value);
        }

        [Fact]
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

            Assert.IsType<OkObjectResult>(result);
        }
    }
}
