using Catalog.API._02_Infrastructure.Data;
using Catalog.API._01_Services;
using Catalog.API._01_Services.Models;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace Catalog.UnitTests.Services;

[TestClass()]
public class CatalogServiceTests
{
    [TestMethod]
    public void GetAllCategories_ShouldReturnAllCatalogCategories()
    {
        // Arrange
        var catalogCategories = new List<CatalogCategory>
        {
            new() { Id = 1, Name = "Category 1" },
            new() { Id = 2, Name = "Category 2" },
            new() { Id = 3, Name = "Category 3" }
        };

        var mockContext = new Mock<ApplicationDataContext>();
        mockContext.Setup(c => c.CatalogCategories).Returns(CreateMockDbSet(catalogCategories).Object);

        var catalogService = new CatalogService(mockContext.Object);

        // Act
        var result = catalogService.GetAllCategories();

        Assert.AreEqual(catalogCategories.Count, result.Count());
        Assert.AreEqual(catalogCategories[0].Id, result.First().Id);
        Assert.AreEqual(catalogCategories[0].Name, result.First().Name);
    }

    [TestMethod]
    public void GetAll_ShouldReturnAllCatalogItemsIfCategoryIsNotSpecifiedOrDoesNotExist()
    {
        // Arrange
        var catalogCategories = new List<CatalogCategory>
        {
            new() { Id = 1, Name = "Category 1" },
            new() { Id = 2, Name = "Category 2" },
            new() { Id = 3, Name = "Category 3" }
        };

        var catalogBrands = new List<CatalogBrand>
        {
            new() { Id = 1, Name = "Brand 1" },
            new() { Id = 2, Name = "Brand 2" },
            new() { Id = 3, Name = "Brand 3" }
        };

        var catalogItems = new List<CatalogItem>
        {
            new() { Id = Guid.NewGuid(), Name = "Item 1", Description = "Description 1", Price = 10.99m, IsHighlighted = true, Category = catalogCategories[0], Brand = catalogBrands[0] },
            new() { Id = Guid.NewGuid(), Name = "Item 2", Description = "Description 2", Price = 20.99m, IsHighlighted = true, Category = catalogCategories[1], Brand = catalogBrands[1] },
            new() { Id = Guid.NewGuid(), Name = "Item 3", Description = "Description 3", Price = 30.99m, IsHighlighted = true, Category = catalogCategories[2], Brand = catalogBrands[2] }
        };

        var mockContext = new Mock<ApplicationDataContext>();
        mockContext.Setup(c => c.CatalogCategories).Returns(CreateMockDbSet(catalogCategories).Object);
        mockContext.Setup(c => c.CatalogBrands).Returns(CreateMockDbSet(catalogBrands).Object);
        mockContext.Setup(c => c.CatalogItems).Returns(CreateMockDbSet(catalogItems).Object);

        var catalogService = new CatalogService(mockContext.Object);

        // Act
        var result = catalogService.GetAll(It.IsAny<CatalogItemFilter>());

        // Assert
        Assert.AreEqual(catalogItems.Count, result.TotalItems);
        Assert.AreEqual(catalogItems[0].Id, result.Items.First().Id);
        Assert.AreEqual(catalogItems[0].Name, result.Items.First().Name);
        Assert.AreEqual(catalogItems[0].Description, result.Items.First().Description);
        Assert.AreEqual(catalogItems[0].Category.Name, result.Items.First().Category);
        Assert.AreEqual(catalogItems[0].Brand.Name, result.Items.First().Brand);
        Assert.AreEqual(catalogItems[0].Price, result.Items.First().Price);
    }

    [TestMethod]
    public void GetAll_ShouldReturnOnlyItemsWithACertainCategoryIdIfProvided()
    {
        // Arrange
        var catalogCategories = new List<CatalogCategory>
        {
            new() { Id = 1, Name = "Category 1" },
        };

        var catalogBrands = new List<CatalogBrand>
        {
            new() { Id = 1, Name = "Brand 1" },
            new() { Id = 2, Name = "Brand 2" },
            new() { Id = 3, Name = "Brand 3" }
        };

        var catalogItems = new List<CatalogItem>
        {
            new() { Id = Guid.NewGuid(), Name = "Item 1", Description = "Description 1", Price = 10.99m, IsHighlighted = true, Category = catalogCategories[0], Brand = catalogBrands[0] },
            new() { Id = Guid.NewGuid(), Name = "Item 2", Description = "Description 2", Price = 20.99m, IsHighlighted = true, Category = catalogCategories[0], Brand = catalogBrands[1] },
            new() { Id = Guid.NewGuid(), Name = "Item 3", Description = "Description 3", Price = 30.99m, IsHighlighted = true, Category = catalogCategories[0], Brand = catalogBrands[2] }
        };

        var mockContext = new Mock<ApplicationDataContext>();
        mockContext.Setup(c => c.CatalogCategories).Returns(CreateMockDbSet(catalogCategories).Object);
        mockContext.Setup(c => c.CatalogBrands).Returns(CreateMockDbSet(catalogBrands).Object);
        mockContext.Setup(c => c.CatalogItems).Returns(CreateMockDbSet(catalogItems).Object);

        var catalogService = new CatalogService(mockContext.Object);

        // Act
        var result = catalogService.GetAll(new CatalogItemFilter { CategoryId = 1 });

        // Assert
        Assert.AreEqual(catalogItems.Count, result.TotalItems);
        Assert.AreEqual(catalogItems[0].Id, result.Items.First().Id);
        Assert.AreEqual(catalogItems[0].Name, result.Items.First().Name);
        Assert.AreEqual(catalogItems[0].Description, result.Items.First().Description);
        Assert.AreEqual(catalogItems[0].Category.Name, result.Items.First().Category);
        Assert.AreEqual(catalogItems[0].Brand.Name, result.Items.First().Brand);
        Assert.AreEqual(catalogItems[0].Price, result.Items.First().Price);
    }

    [TestMethod]
    public async Task SearchProduct_KeywordIsWhitespace_ReturnsEmptyList()
    {
        // Arrange
        var catalogItems = new List<CatalogItem>();
        var mockContext = new Mock<ApplicationDataContext>();
        mockContext.Setup(c => c.CatalogItems).Returns(CreateMockDbSet(catalogItems).Object);
        var catalogService = new CatalogService(mockContext.Object);

        // Act
        var result = await catalogService.SearchProduct(" ");

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual(0, result.Count());
    }

    [TestMethod]
    public async Task SearchProduct_KeywordIsEmpty_ReturnsEmptyList()
    {
        // Arrange
        var catalogItems = new List<CatalogItem>();
        var mockContext = new Mock<ApplicationDataContext>();
        mockContext.Setup(c => c.CatalogItems).Returns(CreateMockDbSet(catalogItems).Object);
        var catalogService = new CatalogService(mockContext.Object);

        // Act
        var result = await catalogService.SearchProduct(string.Empty);

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual(0, result.Count());
    }

    private static Mock<DbSet<T>> CreateMockDbSet<T>(List<T> lstData) where T : class
    {
        IQueryable<T> dataQueryable = lstData.AsQueryable();
        var dbSetMock = new Mock<DbSet<T>>();

        dbSetMock.As<IQueryable<T>>().Setup(m => m.Provider).Returns(dataQueryable.Provider);
        dbSetMock.As<IQueryable<T>>().Setup(m => m.Expression).Returns(dataQueryable.Expression);
        dbSetMock.As<IQueryable<T>>().Setup(m => m.ElementType).Returns(dataQueryable.ElementType);
        dbSetMock.As<IQueryable<T>>().Setup(m => m.GetEnumerator()).Returns(() => dataQueryable.GetEnumerator());

        dbSetMock.Setup(x => x.AsQueryable()).Returns(dbSetMock.Object);
        dbSetMock.Setup(x => x.Add(It.IsAny<T>())).Callback<T>(lstData.Add);
        dbSetMock.Setup(x => x.AddRange(It.IsAny<IEnumerable<T>>())).Callback<IEnumerable<T>>(lstData.AddRange);
        dbSetMock.Setup(x => x.Remove(It.IsAny<T>())).Callback<T>(t => lstData.Remove(t));
        dbSetMock.Setup(x => x.RemoveRange(It.IsAny<IEnumerable<T>>())).Callback<IEnumerable<T>>(ts =>
        {
            foreach (var t in ts) lstData.Remove(t);
        });

        return dbSetMock;
    }
}

