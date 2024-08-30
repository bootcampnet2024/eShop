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
using Microsoft.AspNetCore.Mvc;

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

    [TestMethod]
    public async Task SearchProduct_ValidKeyword_ReturnsCorrectItems()
    {
        // Arrange
        var logger = new Mock<ILogger<CatalogController>>();
        var service = new Mock<ICatalogService>();
        var controller = new CatalogController(logger.Object, service.Object);

        var catalogItems = new List<CatalogItemDTO>
        {
            new() { Id = Guid.NewGuid(), Name = "Item 1", Description = "Description 1", Category = "Category 1", Brand = "Brand 1", Price = 10.99m },
            new() { Id = Guid.NewGuid(), Name = "Item 2", Description = "Description 2", Category = "Category 2", Brand = "Brand 2", Price = 20.99m },
            new() { Id = Guid.NewGuid(), Name = "Special Item", Description = "Special Description", Category = "Category 3", Brand = "Brand 3", Price = 30.99m }
        };

        service.Setup(s => s.SearchProduct(It.IsAny<string>()))
            .ReturnsAsync((string keyword) =>
            {
                return catalogItems.Where(item => item.Name.Contains(keyword, StringComparison.OrdinalIgnoreCase)).ToList();
            });

        var keyword = "Special";

        // Act
        var result = await controller.SearchProduct(keyword);

        // Assert
        var okResult = result as OkObjectResult;
        Assert.IsNotNull(okResult, "Result should be of type OkObjectResult");
        var items = okResult?.Value as List<CatalogItemDTO>;
        Assert.IsNotNull(items, "Result value should be a List<CatalogItemDTO>");

        Assert.AreEqual(1, items.Count, "Number of items returned should be 1");
        var item = items.First();
        Assert.AreEqual("Special Item", item.Name, "The returned item name should match the expected name");
    }

    [TestMethod]
    public async Task SearchProduct_EmptyKeyword_ReturnsBadRequest()
    {
        // Arrange
        var logger = new Mock<ILogger<CatalogController>>();
        var service = new Mock<ICatalogService>();
        var controller = new CatalogController(logger.Object, service.Object);

        var keyword = string.Empty;

        // Act
        var result = await controller.SearchProduct(keyword);

        // Assert
        var badRequestResult = result as BadRequestObjectResult;
        Assert.IsNotNull(badRequestResult, "Result should be of type BadRequestObjectResult");
        Assert.AreEqual("Keyword cannot be null or empty.", badRequestResult?.Value, "Error message should be 'Keyword cannot be null or empty.'");
    }

    [TestMethod]
    public async Task SearchProduct_KeywordContainsOnlySpaces_ReturnsBadRequest()
    {
        // Arrange
        var logger = new Mock<ILogger<CatalogController>>();
        var service = new Mock<ICatalogService>();
        var controller = new CatalogController(logger.Object, service.Object);

        var keyword = "    ";

        // Act
        var result = await controller.SearchProduct(keyword);

        // Assert
        var badRequestResult = result as BadRequestObjectResult;
        Assert.IsNotNull(badRequestResult, "Result should be of type BadRequestObjectResult");
        Assert.AreEqual("Keyword cannot be null or empty.", badRequestResult?.Value, "Error message should be 'Keyword cannot be null or empty.'");
    }

    [TestMethod]
    public async Task SearchProduct_KeywordWithNoMatchingItems_ReturnsEmptyList()
    {
        // Arrange
        var logger = new Mock<ILogger<CatalogController>>();
        var service = new Mock<ICatalogService>();
        var controller = new CatalogController(logger.Object, service.Object);

        var catalogItems = new List<CatalogItemDTO>
    {
        new() { Id = Guid.NewGuid(), Name = "Item 1", Description = "Description 1", Category = "Category 1", Brand = "Brand 1", Price = 10.99m },
        new() { Id = Guid.NewGuid(), Name = "Item 2", Description = "Description 2", Category = "Category 2", Brand = "Brand 2", Price = 20.99m },
        new() { Id = Guid.NewGuid(), Name = "Item 3", Description = "Description 3", Category = "Category 3", Brand = "Brand 3", Price = 30.99m }
    };

        service.Setup(s => s.SearchProduct(It.IsAny<string>()))
            .ReturnsAsync((string keyword) =>
            {
                return catalogItems.Where(item => item.Name.Contains(keyword, StringComparison.OrdinalIgnoreCase)).ToList();
            });

        var keyword = "Nonexistent";

        // Act
        var result = await controller.SearchProduct(keyword);

        // Assert
        var okResult = result as OkObjectResult;
        Assert.IsNotNull(okResult, "Result should be of type OkObjectResult");
        var items = okResult?.Value as List<CatalogItemDTO>;
        Assert.IsNotNull(items, "Result value should be a List<CatalogItemDTO>");
        Assert.AreEqual(0, items.Count, "Number of items returned should be 0 when no items match the keyword");
    }
}