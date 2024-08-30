using Management.API.Controllers;
using Management.API.Models.Requests;
using Management.API.Operations.Commands.CategoryCommands;
using Management.API.Operations.Commands.ProductCommands;
using Management.API.Operations.Queries.CategoryQueries;
using Management.API.Operations.Queries.ProductQueries;
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
    public class CategoryControllerTest
    {
        private readonly Mock<IMediator> _mediatorMock;
        private readonly CategoriesController _categoryController;

        public CategoryControllerTest()
        {
            _mediatorMock = new Mock<IMediator>();
            _categoryController = new CategoriesController(_mediatorMock.Object);
        }

        [Fact]
        public async Task Add_ReturnsOk_WhenCategoryCreationSucceds()
        {
            var category = new CreateCategoryRequest { Name = "Test" };
            _mediatorMock.Setup(m => m.Send(It.IsAny<CreateCategoryCommand>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(true);

            var result = await _categoryController.Add(category);

            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task GetAll_ReturnsOkWithCateg_WhenCategoriesExists()
        {
            var categories = new List<Category> { new Category(), new Category() };
            _mediatorMock.Setup(m => m.Send(It.IsAny<GetAllCategoriesQuery>(), It.IsAny<CancellationToken>()))
                  .ReturnsAsync(categories);

            var result = await _categoryController.GetAll();

            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(categories, okResult.Value);
        }

        [Fact]
        public async Task GetById_ReturnsOkWithCategory_WhenCategoryExists()
        {
            var categoryId = 1;
            var category = new Category { Id = categoryId };
            _mediatorMock.Setup(m => m.Send(It.IsAny<GetCategoriesByIdQuery>(), It.IsAny<CancellationToken>()))
                         .ReturnsAsync(category);

            var result = await _categoryController.GetById(categoryId);

            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(category, okResult.Value);
        }

        [Fact]
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

            Assert.IsType<OkObjectResult>(result);
        }
    }
}
