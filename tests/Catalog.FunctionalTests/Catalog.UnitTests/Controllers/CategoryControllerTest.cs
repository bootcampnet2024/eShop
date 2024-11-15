using Catalog.API._00_Application.Models.Requests;
using Catalog.API._00_Application.Operations.Commands.CategoryCommands;
using Catalog.API._00_Application.Operations.Queries.CategoryQueries;
using Catalog.API._01_Services.DTOs;
using Catalog.API.Controllers;
using Catalog.API.Controllers.Filters;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace Catalog.UnitTests.Controllers
{
    [TestClass]
    public class CategoryControllerTest
    {
        private readonly Mock<IMediator> _mediatorMock;
        private readonly CategoriesController _categoryController;

        public CategoryControllerTest()
        {
            _mediatorMock = new Mock<IMediator>();
            _categoryController = new CategoriesController(_mediatorMock.Object);
        }

        [TestMethod]
        public async Task Add_ReturnsOk_WhenCategoryCreationSucceds()
        {
            var category = new CreateCategoryRequest { Name = "Test" };
            _mediatorMock.Setup(m => m.Send(It.IsAny<CreateCategoryCommand>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(true);

            var result = await _categoryController.Add(category);

            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        [TestMethod]
        public async Task GetAll_ReturnsOkWithCateg_WhenCategoriesExists()
        {
            var categoriesDTO = new CatalogDataDTO<CatalogCategoryDTO>()
            {
                TotalItems = 2,
                Items = new List<CatalogCategoryDTO>
                {
                    new CatalogCategoryDTO { Name = "Teste1" },
                    new CatalogCategoryDTO { Name = "Teste2" }
                }
            };
            _mediatorMock.Setup(m => m.Send(It.IsAny<GetAllCategoriesQuery>(), It.IsAny<CancellationToken>()))
                  .ReturnsAsync(categoriesDTO);

            var filter = new GenericFilter()
            {
                PageIndex = 0,
                PageSize = 1,
            };

            var result = await _categoryController.GetAll(filter);

            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
        }

        [TestMethod]
        public async Task GetById_ReturnsOkWithCategory_WhenCategoryExists()
        {
            var categoryId = 1;
            var category = new CatalogCategoryDTO { Id = categoryId };
            _mediatorMock.Setup(m => m.Send(It.IsAny<GetCategoryByIdQuery>(), It.IsAny<CancellationToken>()))
                         .ReturnsAsync(category);

            var result = await _categoryController.GetById(categoryId);

            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
        }

        [TestMethod]
        public async Task GetByName_ReturnsOkWithCategories_WhenCategoriesExists()
        {
            var categoryName = "test";
            var categoriesDTO = new CatalogDataDTO<CatalogCategoryDTO>()
            {
                TotalItems = 2,
                Items = new List<CatalogCategoryDTO>
                {
                    new CatalogCategoryDTO { Name = "Teste1" },
                    new CatalogCategoryDTO { Name = "Teste2" }
                }
            };
            _mediatorMock.Setup(m => m.Send(It.IsAny<GetCategoriesByNameQuery>(), It.IsAny<CancellationToken>()))
                         .ReturnsAsync(categoriesDTO);

            var filter = new GenericFilter()
            {
                PageIndex = 0,
                PageSize = 1,
            };

            var result = await _categoryController.GetByName(categoryName, filter);

            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
        }

        [TestMethod]
        public async Task Update_ReturnsOk_WhenCategoryUpdateSucceeds()
        {
            var categoryId = 1;
            var request = new UpdateCategoryRequest
            {
                Name = "Test"
            };

            _mediatorMock.Setup(m => m.Send(It.IsAny<UpdateCategoryCommand>(), It.IsAny<CancellationToken>()))
                         .ReturnsAsync(true);

            var result = await _categoryController.Update(categoryId, request);

            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }
    }
}
