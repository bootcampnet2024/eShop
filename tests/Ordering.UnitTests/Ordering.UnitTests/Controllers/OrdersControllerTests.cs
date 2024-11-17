using eShop.Library.Services;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ordering.API.Application.Commands;
using Ordering.API.Application.Models;
using Ordering.API.Application.Queries;
using Ordering.API.Application.Requests;
using Ordering.API.Application.ViewModels;
using Ordering.API.Controllers;
using Ordering.Domain.AggregatesModel.BuyerAggregate;
using Ordering.Domain.AggregatesModel.OrderAggregate;

namespace Ordering.UnitTests.Controllers;

[TestClass()]
public class OrdersControllerTests
{
    private Mock<IMediator> _mediatorMock;
    private Mock<ILogger<OrdersController>> _loggerMock;
    private Mock<IKeycloakService> _keyCloakServiceMock;
    private OrdersController _controller;
    public OrdersControllerTests()
    {
        _mediatorMock = new Mock<IMediator>();
        _keyCloakServiceMock = new Mock<IKeycloakService>();
        _loggerMock = new Mock<ILogger<OrdersController>>();

        _controller = new OrdersController(_loggerMock.Object, _keyCloakServiceMock.Object, _mediatorMock.Object);
    }

    [TestMethod]
    public async Task GetCardsTypes_ReturnsOkWithCardTypes_WhenCardTypesExist()
    {

        var cardTypeList = new List<CardTypeViewModel>
        {
            new() { Id = 1, Name = "Amex" },
            new() { Id = 2, Name = "Visa" },
            new() { Id = 3, Name = "MasterCard" }
        };

        _mediatorMock.Setup(s => s.Send(It.IsAny<GetCardTypesQuery>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(cardTypeList);

        var result = await _controller.GetCardsTypes();

        var okResult = result as OkObjectResult;
        Assert.IsNotNull(okResult);
        Assert.AreEqual(200, okResult.StatusCode);

        var returnedCardTypes = okResult.Value as List<CardTypeViewModel>;
        Assert.IsNotNull(returnedCardTypes);
        Assert.AreEqual(3, returnedCardTypes.Count);

        Assert.AreEqual("Amex", returnedCardTypes[0].Name);
        Assert.AreEqual("Visa", returnedCardTypes[1].Name);
        Assert.AreEqual("MasterCard", returnedCardTypes[2].Name);
    }

    [TestMethod]
    public async Task CancelOrder_ReturnsOkWithCardTypes_WhenCardTypesExist()
    {
        var keycloakId = Guid.NewGuid().ToString();

        var newOrder = CreateAnOrder(keycloakId);
        newOrder.SetAwaitingValidationStatus();

        _keyCloakServiceMock.Setup(k => k.GetUserId()).Returns(keycloakId);
        _keyCloakServiceMock.Setup(k => k.GetUserRoles()).Returns(["user-manager"]);

        _mediatorMock.Setup(m => m.Send(It.IsAny<GetOrderByIdQuery>(), default)).ReturnsAsync(OrderViewModel.FromModel(newOrder));
        _mediatorMock.Setup(m => m.Send(It.IsAny<CancelOrderCommand>(), default)).ReturnsAsync(true);

        var result = await _controller.CancelOrder(1);

        Assert.IsInstanceOfType(result, typeof(OkResult));
        _mediatorMock.Verify(m => m.Send(It.IsAny<CancelOrderCommand>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [TestMethod]
    public async Task CancelOrder_ShouldReturnUnauthorized_WhenUserIdIsEmpty()
    {
        _keyCloakServiceMock.Setup(x => x.GetUserId()).Returns(string.Empty);

        var result = await _controller.CancelOrder(1);

        Assert.IsInstanceOfType(result, typeof(UnauthorizedResult));
    }

    [TestMethod]
    public async Task CancelOrder_ShouldReturnForbid_WhenUserIsNotAuthorized()
    {
        var keycloakId = Guid.NewGuid().ToString();
        var order = CreateAnOrder(keycloakId);
        _keyCloakServiceMock.Setup(x => x.GetUserId()).Returns(Guid.NewGuid().ToString());
        _keyCloakServiceMock.Setup(x => x.GetUserRoles()).Returns(["user"]);
        _mediatorMock.Setup(x => x.Send(It.IsAny<GetOrderByIdQuery>(), default))
            .ReturnsAsync(OrderViewModel.FromModel(order));

        var result = await _controller.CancelOrder(1);

        Assert.IsInstanceOfType(result, typeof(ForbidResult));
    }


    [TestMethod]
    public async Task CancelOrder_ShouldReturnForbid_WhenUserIsAnUserManagerOrAnAdminAndIdIsDifferent()
    {
        var keycloakId = Guid.NewGuid().ToString();
        var order = CreateAnOrder(Guid.NewGuid().ToString());
        _keyCloakServiceMock.Setup(x => x.GetUserId()).Returns(keycloakId);
        _keyCloakServiceMock.Setup(x => x.GetUserRoles()).Returns(["user"]);
        _mediatorMock.Setup(x => x.Send(It.IsAny<GetOrderByIdQuery>(), default))
            .ReturnsAsync(OrderViewModel.FromModel(order));

        var result = await _controller.CancelOrder(1);

        Assert.IsInstanceOfType(result, typeof(ForbidResult));
    }



    [TestMethod]
    public async Task ShipOrder_ReturnsOk_WhenOrderStatusChangeToShip()
    {
        var keycloakId = Guid.NewGuid().ToString();

        var newOrder = CreateAnOrder(keycloakId);
        newOrder.SetAwaitingValidationStatus();

        _keyCloakServiceMock.Setup(k => k.GetUserId()).Returns(keycloakId);
        _keyCloakServiceMock.Setup(k => k.GetUserRoles()).Returns(["user-manager"]);

        _mediatorMock.Setup(m => m.Send(It.IsAny<GetOrderByIdQuery>(), default))
            .ReturnsAsync(OrderViewModel.FromModel(newOrder));
        _mediatorMock.Setup(m => m.Send(It.IsAny<ShipOrderCommand>(), default)).ReturnsAsync(true);

        var result = await _controller.ShipOrder(1);


        Assert.IsInstanceOfType(result, typeof(OkResult));
        _mediatorMock.Verify(m => m.Send(It.IsAny<ShipOrderCommand>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [TestMethod]
    public async Task ShipOrder_ShouldReturnUnauthorized_WhenRolesAreNull()
    {
        _keyCloakServiceMock.Setup(x => x.GetUserRoles()).Returns((List<string>)null);

        var result = await _controller.ShipOrder(1);

        Assert.IsInstanceOfType(result, typeof(UnauthorizedResult));
    }

    [TestMethod]
    public async Task ShipOrder_ShouldReturnForbid_WhenUserIsNotAdminOrManager()
    {
        var keycloakId = Guid.NewGuid().ToString();
        var order = CreateAnOrder(Guid.NewGuid().ToString());
        _keyCloakServiceMock.Setup(x => x.GetUserId()).Returns(keycloakId);
        _keyCloakServiceMock.Setup(x => x.GetUserRoles()).Returns(["user"]);
        _mediatorMock.Setup(x => x.Send(It.IsAny<GetOrderByIdQuery>(), default))
            .ReturnsAsync(OrderViewModel.FromModel(order));

        var result = await _controller.ShipOrder(1);

        Assert.IsInstanceOfType(result, typeof(ForbidResult));
    }

    [TestMethod]
    public async Task ShipOrder_ShouldReturnNotFound_WhenOrderIsNotFound()
    {
        _keyCloakServiceMock.Setup(x => x.GetUserRoles()).Returns(["admin"]);
        _mediatorMock.Setup(x => x.Send(It.IsAny<GetOrderByIdQuery>(), default))
            .ReturnsAsync((OrderViewModel)null);

        var result = await _controller.ShipOrder(1);

        Assert.IsInstanceOfType(result, typeof(NotFoundResult));
    }

    [TestMethod]
    public async Task GetOrders_ReturnsOk_WhenAllOrdersOfAnUserAreReturned()
    {
        var keycloakId = Guid.NewGuid().ToString();
        var newOrder = CreateAnOrder(keycloakId);
        var orders = new List<OrderSummaryViewModel>
        {
            new() {
                PictureUrl = "http://example.com/produto1.png",
                OrderId = 1,
                Date = DateTime.UtcNow.AddDays(-1),
                Status = "AwaitingValidation",
                Total = 200.00
            },
            new() {
                PictureUrl = "http://example.com/produto2.png",
                OrderId = 2,
                Date = DateTime.UtcNow.AddDays(-2),
                Status = "Shipped",
                Total = 300.00
            },
            new() {
                PictureUrl = "http://example.com/produto3.png",
                OrderId = 3,
                Date = DateTime.UtcNow.AddDays(-3),
                Status = "Delivered",
                Total = 150.00
            }
        };

        _keyCloakServiceMock.Setup(k => k.GetUserId()).Returns(keycloakId);
        _keyCloakServiceMock.Setup(k => k.GetUserRoles()).Returns(["user-manager"]);

        _mediatorMock.Setup(m => m.Send(It.IsAny<GetOrdersByUserIdQuery>(), default)).ReturnsAsync(orders);


        var result = await _controller.GetOrders(newOrder.Buyer.IdentityGuid);

        Assert.IsInstanceOfType(result, typeof(OkObjectResult));

        var okResult = result as OkObjectResult;
        Assert.IsNotNull(okResult);
        Assert.AreEqual(200, okResult.StatusCode);

        var returnedOrderSummaryList = okResult.Value as List<OrderSummaryViewModel>;
        Assert.IsNotNull(returnedOrderSummaryList);
        Assert.AreEqual(3, returnedOrderSummaryList.Count);
    }

    [TestMethod]
    public async Task GetOrders_ShouldReturnNoContent_WhenNoOrdersExist()
    {
        var keycloakId = Guid.NewGuid().ToString();
        var newOrder = CreateAnOrder(keycloakId);

        _keyCloakServiceMock.Setup(x => x.GetUserId()).Returns(keycloakId);
        _keyCloakServiceMock.Setup(x => x.GetUserRoles()).Returns(["user-manager"]);
        _mediatorMock.Setup(x => x.Send(It.IsAny<GetOrdersByUserIdQuery>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync([]);

        var result = await _controller.GetOrders(keycloakId);

        Assert.IsInstanceOfType(result, typeof(NoContentResult));
    }


    [TestMethod]
    public async Task CreateOrder_ReturnsCreated_WhenCommandSucceeds()
    {
        var keycloakId = Guid.NewGuid().ToString();
        var newOrder = CreateAnOrder(keycloakId);
        var request = CreateValidOrderRequest();


        _keyCloakServiceMock.Setup(k => k.GetUserId()).Returns(keycloakId);
        _keyCloakServiceMock.Setup(k => k.GetUserName()).Returns("John Doe");
        _keyCloakServiceMock.Setup(k => k.GetUserRoles()).Returns(["user-manager"]);

        _mediatorMock.Setup(m => m.Send(It.IsAny<CreateOrderCommand>(), default))
            .ReturnsAsync(OrderViewModel.FromModel(newOrder));

        var result = await _controller.CreateOrder(request);

        var createResult = result as CreatedAtActionResult;
        Assert.IsNotNull(createResult);
        Assert.IsInstanceOfType(createResult.Value, typeof(OrderViewModel));
    }


    [TestMethod]
    public async Task CreateOrder_ReturnsBadRequest_WhenCommandFails()
    {
        var keycloakId = Guid.NewGuid().ToString();
        var newOrder = CreateAnOrder(keycloakId);
        var request = CreateValidOrderRequest();

        _keyCloakServiceMock.Setup(k => k.GetUserId()).Returns(keycloakId);
        _keyCloakServiceMock.Setup(k => k.GetUserName()).Returns("John Doe");
        _keyCloakServiceMock.Setup(k => k.GetUserRoles()).Returns(["user-manager"]);

        _mediatorMock.Setup(m => m.Send(It.IsAny<CreateOrderCommand>(), default))
            .ReturnsAsync((OrderViewModel)null);

        var result = await _controller.CreateOrder(request);

        Assert.IsInstanceOfType(result, typeof(BadRequestResult));
    }


    [TestMethod]
    public async Task GetOrder_ReturnsOk_WhenAnOrderIsReturnedById()
    {
        var keycloakId = Guid.NewGuid().ToString();
        var newOrder = CreateAnOrder(keycloakId);

        _keyCloakServiceMock.Setup(k => k.GetUserId()).Returns(keycloakId);
        _keyCloakServiceMock.Setup(k => k.GetUserRoles()).Returns(["user-manager"]);

        var orderToViewModel = OrderViewModel.FromModel(newOrder);

        _mediatorMock.Setup(m => m.Send(It.IsAny<GetOrderByIdQuery>(), default))
            .ReturnsAsync(orderToViewModel);

        var result = await _controller.GetOrder(newOrder.Id);

        var okResult = result as OkObjectResult;
        Assert.IsNotNull(result);
        Assert.AreEqual(200, okResult?.StatusCode);

        var returnedOrder = okResult?.Value as OrderViewModel;
        Assert.IsInstanceOfType(returnedOrder, typeof(OrderViewModel));
        Assert.AreEqual(returnedOrder, orderToViewModel);
    }

    [TestMethod]
    public async Task GetOrder_ShouldReturnNotFound_WhenOrderDoesNotExist()
    {
        var keycloakId = Guid.NewGuid().ToString();
        var orderId = 1;

        _keyCloakServiceMock.Setup(x => x.GetUserId()).Returns(keycloakId);
        _mediatorMock.Setup(x => x.Send(It.IsAny<GetOrderByIdQuery>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((OrderViewModel)null);

        var result = await _controller.GetOrder(orderId);
    }


    private Order CreateAnOrder(string keycloakId)
    {
        var buyer = new Buyer(keycloakId, "John Doe");

        var order = new Order(
           userId: keycloakId,
           userName: buyer.Name,
           address: new Address("Rua Exemplo", "Cidade Exemplo", "Estado Exemplo", "Brasil", "12345-678"),
           cardTypeId: 1,
           cardNumber: "1234123412341234",
           cardSecurityNumber: "123",
           cardHolderName: buyer.Name,
           cardExpiration: DateTime.UtcNow.AddYears(1),
           buyerId: 1,
           paymentMethodId: 1
        );

        typeof(Order).GetProperty("Id")?.SetValue(order, 1);
        typeof(Order).GetProperty("Buyer")?.SetValue(order, buyer);

        order.AddOrderItem(Guid.NewGuid().ToString(), "Produto Exemplo", 100m, 90m, "http://example.com/produto.png", 2);

        return order;
    }

    private CreateOrderRequest CreateValidOrderRequest()
    {
        return new CreateOrderRequest(
            City: "Cidade Exemplo",
            Street: "Rua Exemplo",
            State: "Estado Exemplo",
            Country: "Brasil",
            ZipCode: "12345-678",
            CardNumber: "1234123412341234",
            CardHolderName: "John Doe",
            CardExpiration: DateOnly.FromDateTime(DateTime.UtcNow.AddYears(1)),
            CardSecurityNumber: "123",
            CardTypeId: 1,
            Items:
            [
                    new BasketItem
                    {
                        ProductId = Guid.NewGuid().ToString(),
                        ProductName = "Produto Exemplo",
                        UnitPrice = 100m,
                        OldUnitPrice = 90m,
                        Quantity = 2,
                        PictureUrl = "https://example.com/product-image.jpg"
                    },
            ]);
    }

}
