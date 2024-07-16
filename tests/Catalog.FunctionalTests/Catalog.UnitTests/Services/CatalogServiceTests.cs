using Catalog.API._02_Infrastructure.Data;
using Catalog.API.Services;
using Catalog.API.Services.Models;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Catalog.UnitTests.Services
{
    [TestClass()]
    public class CatalogServiceTests
    {
        [TestMethod]
        public void GetAll_ShouldReturnAllCatalogItems()
        {
            // Arrange
            var catalogItems = new List<CatalogItem>
            {
                new CatalogItem { Id = Guid.NewGuid(), Name = "Item 1", Description = "Description 1", Price = 10.99m, Brand = new CatalogBrand { Id = 1, Name = "Brand 1" } },
                new CatalogItem { Id = Guid.NewGuid(), Name = "Item 2", Description = "Description 2", Price = 20.99m, Brand = new CatalogBrand { Id = 2, Name = "Brand 2" } },
                new CatalogItem { Id = Guid.NewGuid(), Name = "Item 3", Description = "Description 3", Price = 30.99m, Brand = new CatalogBrand { Id = 3, Name = "Brand 3" } }
            };

            var mockContext = GetMock<CatalogItem, ApplicationDataContext>(catalogItems, x => x.CatalogItems);

            // .GetMock<Employee, DataContext>(lstUser, x => x.M_Employee);
            var catalogService = new CatalogService(mockContext);

            // Act
            var result = catalogService.GetAll();

            // Assert
            Assert.AreEqual(catalogItems.Count, result.Count());
            Assert.AreEqual(catalogItems[0].Id, result.First().Id);
            Assert.AreEqual(catalogItems[0].Name, result.First().Name);
            Assert.AreEqual(catalogItems[0].Description, result.First().Description);
            Assert.AreEqual(catalogItems[0].Brand.Name, result.First().Brand);
            Assert.AreEqual(catalogItems[0].Price, result.First().Price);
        }


        private static TContext GetMock<TData, TContext>(List<TData> lstData, Expression<Func<TContext, DbSet<TData>>> dbSetSelectionExpression) where TData : class where TContext : DbContext
        {
            IQueryable<TData> lstDataQueryable = lstData.AsQueryable();
            Mock<DbSet<TData>> dbSetMock = new Mock<DbSet<TData>>();
            Mock<TContext> dbContext = new Mock<TContext>();

            dbSetMock.As<IQueryable<TData>>().Setup(s => s.Provider).Returns(lstDataQueryable.Provider);
            dbSetMock.As<IQueryable<TData>>().Setup(s => s.Expression).Returns(lstDataQueryable.Expression);
            dbSetMock.As<IQueryable<TData>>().Setup(s => s.ElementType).Returns(lstDataQueryable.ElementType);
            dbSetMock.As<IQueryable<TData>>().Setup(s => s.GetEnumerator()).Returns(() => lstDataQueryable.GetEnumerator());
            dbSetMock.Setup(x => x.Add(It.IsAny<TData>())).Callback<TData>(lstData.Add);
            dbSetMock.Setup(x => x.AddRange(It.IsAny<IEnumerable<TData>>())).Callback<IEnumerable<TData>>(lstData.AddRange);
            dbSetMock.Setup(x => x.Remove(It.IsAny<TData>())).Callback<TData>(t => lstData.Remove(t));
            dbSetMock.Setup(x => x.RemoveRange(It.IsAny<IEnumerable<TData>>())).Callback<IEnumerable<TData>>(ts =>
            {
                foreach (var t in ts) { lstData.Remove(t); }
            });


            dbContext.Setup(dbSetSelectionExpression).Returns(dbSetMock.Object);

            return dbContext.Object;
        }
    }
}