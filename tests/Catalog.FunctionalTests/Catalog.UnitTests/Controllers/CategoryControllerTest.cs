using Catalog.API._00_Application.Models.Requests;
using Catalog.API._00_Application.Operations.Commands.CategoryCommands;
using Catalog.API._00_Application.Operations.Queries.CategoryQueries;
using Catalog.API.Controllers;
using Catalog.API.Services.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

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
            var categories = new List<CatalogCategory> { new CatalogCategory(), new CatalogCategory() };
            _mediatorMock.Setup(m => m.Send(It.IsAny<GetAllCategoriesQuery>(), It.IsAny<CancellationToken>()))
                  .ReturnsAsync(categories);

            var result = await _categoryController.GetAll();

            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(categories, okResult.Value);
        }

        [TestMethod]
        public async Task GetById_ReturnsOkWithCategory_WhenCategoryExists()
        {
            var categoryId = 1;
            var category = new CatalogCategory { Id = categoryId };
            _mediatorMock.Setup(m => m.Send(It.IsAny<GetCategoriesByIdQuery>(), It.IsAny<CancellationToken>()))
                         .ReturnsAsync(category);

            var result = await _categoryController.GetById(categoryId);

            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(category, okResult.Value);
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
