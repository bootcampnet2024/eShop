using Catalog.API.Application.Result;
using Catalog.API.Services.DTOs;
using Catalog.API.Services;
using Microsoft.Extensions.Logging;
using Moq;
using Catalog.API.Controllers.Core;
using Catalog.API._01_Services.DTOs;
using Catalog.API._00_Application.Result;
using Catalog.API.Controllers;
using Catalog.API.Controllers.Filters;

namespace Catalog.UnitTests.Controllers;

[TestClass()]
public class CatalogControllerTests
{
    [TestMethod]
    public void GetAllCategories_ReturnsCatalogCategoryResult()
    {
        var logger = new Mock<ILogger<CatalogController>>();
        var service = new Mock<ICatalogService>();
        var controller = new CatalogController(logger.Object, service.Object);

        var catalogCategories = new List<CatalogCategoryDTO>
        {
            new() { Id = 1, Name = "Category 1" },
            new() { Id = 2, Name = "Category 2" }
        };

        service.Setup(s => s.GetAllCategories()).Returns(catalogCategories);

        // Act
        var result = controller.GetAllCategories();

        // Assert
        Assert.IsNotNull(result);
        Assert.IsInstanceOfType(result, typeof(IEnumerable<CatalogCategoryResult>));
        Assert.IsTrue(result.Count() == 2);
    }

    [TestMethod]
    public void GetAllItems_ReturnsCatalogItemsResult()
    {
        // Arrange
        var logger = new Mock<ILogger<CatalogController>>();
        var service = new Mock<ICatalogService>();
        var controller = new CatalogController(logger.Object, service.Object);

        var catalogItems = new List<CatalogItemDTO>
        {
            new() { Id = Guid.NewGuid(), Name = "Item 1", Description = "Description 1", Category = "Category 1", Brand = "Brand 1", Price = 10.99m },
            new() { Id = Guid.NewGuid(), Name = "Item 2", Description = "Description 2", Category = "Category 2", Brand = "Brand 2", Price = 20.99m }
        };

        var resultCatalogItems = new CatalogItemDataResult() { TotalItems = 2, Items = catalogItems };

        service.Setup(s => s.GetAll(It.IsAny<CatalogItemFilter>())).Returns(resultCatalogItems);

        // Act
        var result = controller.GetAll(It.IsAny<CatalogItemsFilter>());

        // Assert
        Assert.IsNotNull(result);
        Assert.IsInstanceOfType(result, typeof(PaginatedItems<CatalogItemsResult>));
        Assert.IsTrue(result.Count == 2);
    }
}