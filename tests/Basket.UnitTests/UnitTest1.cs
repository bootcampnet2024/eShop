using Basket.API._01_Services;
using Basket.API._01_Services.DTOs;
using Basket.API.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;

namespace Basket.UnitTests.Controllers
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

            var result = _controller.AddToCart(userId, item);

            Assert.IsInstanceOfType(result, typeof(OkResult));
            _mockBasketService.Verify(s => s.AddToCart(It.Is<CartItemDTO>(i => i.ProductId == 1 && i.Quantity == 2), userId), Times.Once);
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

            _mockBasketService.Setup(s => s.GetCartItems(userId)).Returns(items);

            var result = _controller.GetCartItems(userId) as OkObjectResult;

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

            var result = _controller.UpdateCartItem(userId, item);

            Assert.IsInstanceOfType(result, typeof(OkResult));
            _mockBasketService.Verify(s => s.UpdateCartItem(It.Is<CartItemDTO>(i => i.ProductId == 1 && i.Quantity == 5), userId), Times.Once);
        }

        [TestMethod]
        public void RemoveFromCart_ValidRequest_ReturnsOk()
        {
            var userId = "user123";
            var productId = 1;

            var result = _controller.RemoveFromCart(userId, productId);

            Assert.IsInstanceOfType(result, typeof(OkResult));
            _mockBasketService.Verify(s => s.RemoveFromCart(productId, userId), Times.Once);
        }

        [TestMethod]
        public void AddToCart_ExceptionThrown_ReturnsInternalServerError()
        {
            var userId = "user123";
            var item = new CartItemDTO { ProductId = 1, Quantity = 2 };
            _mockBasketService.Setup(s => s.AddToCart(It.IsAny<CartItemDTO>(), It.IsAny<string>())).Throws(new Exception("Error adding to cart"));

            var result = _controller.AddToCart(userId, item) as ObjectResult;

            Assert.IsNotNull(result);
            Assert.AreEqual(500, result.StatusCode);
            Assert.AreEqual("Error adding to cart", result.Value);
        }

        [TestMethod]
        public void GetCartItems_ExceptionThrown_ReturnsInternalServerError()
        {
            var userId = "user123";
            _mockBasketService.Setup(s => s.GetCartItems(It.IsAny<string>())).Throws(new Exception("Error getting cart items"));

            var result = _controller.GetCartItems(userId) as ObjectResult;

            Assert.IsNotNull(result);
            Assert.AreEqual(500, result.StatusCode);
            Assert.AreEqual("Error getting cart items", result.Value);
        }

        [TestMethod]
        public void UpdateCartItem_ExceptionThrown_ReturnsInternalServerError()
        {
            var userId = "user123";
            var item = new CartItemDTO { ProductId = 1, Quantity = 5 };
            _mockBasketService.Setup(s => s.UpdateCartItem(It.IsAny<CartItemDTO>(), It.IsAny<string>())).Throws(new Exception("Error updating cart item"));

            var result = _controller.UpdateCartItem(userId, item) as ObjectResult;

            Assert.IsNotNull(result);
            Assert.AreEqual(500, result.StatusCode);
            Assert.AreEqual("Error updating cart item", result.Value);
        }

        [TestMethod]
        public void RemoveFromCart_ExceptionThrown_ReturnsInternalServerError()
        {
            var userId = "user123";
            var productId = 1;
            _mockBasketService.Setup(s => s.RemoveFromCart(It.IsAny<int>(), It.IsAny<string>())).Throws(new Exception("Error removing from cart"));

            var result = _controller.RemoveFromCart(userId, productId) as ObjectResult;

            Assert.IsNotNull(result);
            Assert.AreEqual(500, result.StatusCode);
            Assert.AreEqual("Error removing from cart", result.Value);
        }
    }
}
