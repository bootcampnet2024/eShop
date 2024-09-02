using Basket.API._01_Services;
using Basket.API._01_Services.DTOs;
using Basket.API.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;

namespace Basket.UnitTests
{
    [TestClass]
    public class BasketControllerTests
    {
        private Mock<ILogger<BasketController>> _mockLogger;
        private Mock<IBasketService> _mockBasketService;
        private BasketController _controller;

        [TestInitialize]
        public void Setup()
        {
            _mockLogger = new Mock<ILogger<BasketController>>();
            _mockBasketService = new Mock<IBasketService>();
            _controller = new BasketController(_mockBasketService.Object, _mockLogger.Object);
        }

        [TestMethod]
        public void AddToCart_ValidRequest_ReturnsOk()
        {
            var userId = "user123";
            var item = new CartItemDTO { ProductId = 1, Quantity = 2 };

            var result = _controller.Add(userId, item);

            Assert.IsInstanceOfType(result, typeof(OkResult));
            _mockBasketService.Verify(s => s.Add(It.Is<CartItemDTO>(i => i.ProductId == 1 && i.Quantity == 2), userId), Times.Once);
        }

        [TestMethod]
        public void GetCartItems_ValidRequest_ReturnsItems()
        {
            var userId = "user123";
            var items = new List<CartItemDTO>
            {
                new() { ProductId = 1, Quantity = 2 },
                new() { ProductId = 2, Quantity = 3 }
            };

            _mockBasketService.Setup(s => s.GetItems(userId)).Returns(items);

            var result = _controller.GetItems(userId) as OkObjectResult;

            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            var returnedItems = result.Value as IEnumerable<CartItemDTO>;
            Assert.AreEqual(2, returnedItems.Count());
        }

        [TestMethod]
        public void UpdateCartItem_ValidRequest_ReturnsOk()
        {
            var userId = "user123";
            var item = new CartItemDTO { ProductId = 1, Quantity = 5 };

            var result = _controller.Update(userId, item);

            Assert.IsInstanceOfType(result, typeof(OkResult));
            _mockBasketService.Verify(s => s.Update(It.Is<CartItemDTO>(i => i.ProductId == 1 && i.Quantity == 5), userId), Times.Once);
        }

        [TestMethod]
        public void RemoveFromCart_ValidRequest_ReturnsOk()
        {
            var userId = "user123";
            var productId = 1;

            var result = _controller.Remove(userId, productId);

            Assert.IsInstanceOfType(result, typeof(OkResult));
            _mockBasketService.Verify(s => s.Remove(productId, userId), Times.Once);
        }

        [TestMethod]
        public void AddToCart_ExceptionThrown_ReturnsInternalServerError()
        {
            var userId = "user123";
            var item = new CartItemDTO { ProductId = 1, Quantity = 2 };
            _mockBasketService.Setup(s => s.Add(It.IsAny<CartItemDTO>(), It.IsAny<string>())).Throws(new Exception("Error adding to cart"));

            var result = _controller.Add(userId, item) as ObjectResult;

            Assert.IsNotNull(result);
            Assert.AreEqual(500, result.StatusCode);
            Assert.AreEqual("Error adding to cart", result.Value);
        }

        [TestMethod]
        public void GetCartItems_ExceptionThrown_ReturnsInternalServerError()
        {
            var userId = "user123";
            _mockBasketService.Setup(s => s.GetItems(It.IsAny<string>())).Throws(new Exception("Error getting cart items"));

            var result = _controller.GetItems(userId) as ObjectResult;

            Assert.IsNotNull(result);
            Assert.AreEqual(500, result.StatusCode);
            Assert.AreEqual("Error getting cart items", result.Value);
        }

        [TestMethod]
        public void UpdateCartItem_ExceptionThrown_ReturnsInternalServerError()
        {
            var userId = "user123";
            var item = new CartItemDTO { ProductId = 1, Quantity = 5 };
            _mockBasketService.Setup(s => s.Update(It.IsAny<CartItemDTO>(), It.IsAny<string>())).Throws(new Exception("Error updating cart item"));

            var result = _controller.Update(userId, item) as ObjectResult;

            Assert.IsNotNull(result);
            Assert.AreEqual(500, result.StatusCode);
            Assert.AreEqual("Error updating cart item", result.Value);
        }

        [TestMethod]
        public void RemoveFromCart_ExceptionThrown_ReturnsInternalServerError()
        {
            var userId = "user123";
            var productId = 1;
            _mockBasketService.Setup(s => s.Remove(It.IsAny<int>(), It.IsAny<string>())).Throws(new Exception("Error removing from cart"));

            var result = _controller.Remove(userId, productId) as ObjectResult;

            Assert.IsNotNull(result);
            Assert.AreEqual(500, result.StatusCode);
            Assert.AreEqual("Error removing from cart", result.Value);
        }
    }
}
