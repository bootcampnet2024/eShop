using Microsoft.VisualStudio.TestTools.UnitTesting;
using Catalog.API.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Catalog.API.Application.Result;
using Catalog.API.Services.DTOs;
using Catalog.API.Services;
using Microsoft.Extensions.Logging;
using Moq;
using Catalog.API.Controllers.Core;

namespace Catalog.API.Controllers.Tests
{
    [TestClass()]
    public class CatalogControllerTests
    {
        [TestMethod]
        public void GetAll_ReturnsCatalogItemsResult()
        {
            // Arrange
            var logger = new Mock<ILogger<CatalogController>>();
            var service = new Mock<ICatalogService>();
            var controller = new CatalogController(logger.Object, service.Object);

            var catalogItems = new List<CatalogItemDTO>
            {
                new() { Id = Guid.NewGuid(), Name = "Item 1", Description = "Description 1", Brand = "Brand 1", Price = 10.99m },
                new() { Id = Guid.NewGuid(), Name = "Item 2", Description = "Description 2", Brand = "Brand 2", Price = 20.99m }
            };

            var resultCatalogItems = new CatalogItemDataResult() {  TotalItems = 2, Items = catalogItems };

            service.Setup(s => s.GetAll(It.IsAny<CatalogItemFilter>())).Returns(resultCatalogItems);

            // Act
            var result = controller.GetAll(null);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(PaginatedItems<CatalogItemsResult>));
            Assert.IsTrue(result.Count == 2);
        }
    }
}