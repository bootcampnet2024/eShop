using eShop.Library.Services;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ordering.API.Application.Commands;
using Ordering.API.Application.Extensions;
using Ordering.API.Application.Queries;
using Ordering.API.Application.Requests;
using Ordering.API.Application.ViewModels;
using Ordering.Domain.AggregatesModel.OrderAggregate;
using System.Net;

namespace Ordering.API.Controllers;

[ApiController]
[Authorize]
[Route("api/orders")]
public class OrdersController(ILogger<OrdersController> logger, IKeycloakService keycloakService, IMediator mediator) : ControllerBase
{
    /*
     * Reference APIs
    /userId/{userId} - GET
    / - POST
    /cancel - PATCH
    /ship - PATCH
    /{orderId:int} - GET
    /card-types - GET
   */

    private readonly IKeycloakService _keycloakService = keycloakService;
    private readonly ILogger<OrdersController> _logger = logger;
    private readonly IMediator _mediator = mediator;

    [HttpPatch("cancel/{orderId:int}")]
    [Produces("application/json")]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType((int)HttpStatusCode.Forbidden)]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    public async Task<IActionResult> CancelOrder(int orderId)
    {
        var keycloakId = _keycloakService.GetUserId();
        var keycloakRoles = _keycloakService.GetUserRoles();

        if (string.IsNullOrEmpty(keycloakId))
            return Unauthorized();

        var query = new GetOrderByIdQuery(orderId);
        var order = await _mediator.Send(query);

        if (order is null)
            return NotFound();

        if (order.BuyerId != keycloakId && !(keycloakRoles.Contains("user-manager") || keycloakRoles.Contains("admin")))
            return Forbid();

        _logger.LogInformation(
            "Sending command: {CommandName} - {IdProperty}: ({@Command})",
            nameof(CancelOrderCommand),
            nameof(orderId),
            orderId);

        var command = new CancelOrderCommand(orderId);
        var result = await _mediator.Send(command);

        if (!result)
            return BadRequest("Is not possible to change the order status to Cancelled.");

        return Ok();
    }

    [HttpPatch("ship/{orderId:int}")]
    [Produces("application/json")]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType((int)HttpStatusCode.Forbidden)]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    public async Task<IActionResult> ShipOrder(int orderId)
    {
        var keycloakRoles = _keycloakService.GetUserRoles();

        if (keycloakRoles is null || !keycloakRoles.Any())
            return Unauthorized();

        if (!(keycloakRoles.Contains("user-manager") || keycloakRoles.Contains("admin")))
            return Forbid();

        var query = new GetOrderByIdQuery(orderId);
        var order = await _mediator.Send(query);

        if (order is null)
            return NotFound();

        _logger.LogInformation(
            "Sending command: {CommandName} - {IdProperty}: ({@Command})",
            nameof(ShipOrderCommand),
            nameof(orderId),
            orderId);

        var command = new ShipOrderCommand(orderId);
        var result = await _mediator.Send(command);

        if (!result)
            return BadRequest("Is not possible to change the order status to Shipped.");

        return Ok();
    }

    [HttpGet("userId/{userId}")]
    [Produces("application/json")]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType((int)HttpStatusCode.Forbidden)]
    [ProducesResponseType((int)HttpStatusCode.NoContent)]
    [ProducesResponseType(typeof(IEnumerable<OrderSummaryViewModel>), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> GetOrders(string userId)
    {
        var keycloakId = _keycloakService.GetUserId();
        var keycloakRoles = _keycloakService.GetUserRoles();

        if (string.IsNullOrEmpty(keycloakId))
            return Unauthorized();

        if (keycloakId != userId && !(keycloakRoles.Contains("user-manager") || keycloakRoles.Contains("admin")))
            return Forbid();

        _logger.LogInformation(
            "Sending query: {QueryName} - {IdProperty}: ({@Query})",
            nameof(GetOrdersByUserIdQuery),
            nameof(userId),
            userId);

        var query = new GetOrdersByUserIdQuery(userId);
        var orders = await _mediator.Send(query);

        if (!orders.Any())
            return NoContent();

        return Ok(orders);
    }

    [HttpPost]
    [Produces("application/json")]
    [ProducesResponseType((int)HttpStatusCode.BadRequest)]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType((int)HttpStatusCode.Forbidden)]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    [ProducesResponseType(typeof(OrderViewModel), (int)HttpStatusCode.Created)]
    public async Task<IActionResult> CreateOrder(CreateOrderRequest request)
    {
        var keycloakId = _keycloakService.GetUserId();
        var keyCloakUserName = _keycloakService.GetUserName();
        var keycloakRoles = _keycloakService.GetUserRoles();

        if (string.IsNullOrEmpty(keycloakId))
            return Unauthorized();

        _logger.LogInformation(
            "Sending command: {CommandName} - {IdProperty}: {CommandId} ({@Command})",
            nameof(CreateOrderCommand),
            nameof(keycloakId),
            keycloakId,
            request);

        var address = new Address(request.Street, request.City, request.State, request.Country, request.ZipCode);
        var command = new CreateOrderCommand(address,
            request.CardNumber,
            request.CardHolderName,
            request.CardExpiration,
            request.CardTypeId,
            request.CardSecurityNumber,
            keyCloakUserName,
            keycloakId,
            request.Items.ToOrderItemsDTO());

        var operationResult = await _mediator.Send(command);

        if (operationResult is null)
            return BadRequest();

        return CreatedAtAction(nameof(GetOrder), new { operationResult.OrderId }, operationResult);
    }


    [HttpGet("{orderId:int}")]
    [Produces("application/json")]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType((int)HttpStatusCode.Forbidden)]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    [ProducesResponseType(typeof(OrderViewModel), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> GetOrder(int orderId)
    {
        var keycloakId = _keycloakService.GetUserId();
        var keycloakRoles = _keycloakService.GetUserRoles();

        if (string.IsNullOrEmpty(keycloakId))
            return Unauthorized();

        var query = new GetOrderByIdQuery(orderId);
        var order = await _mediator.Send(query);

        if (order is null)
            return NotFound();

        if (order.BuyerId != keycloakId && !(keycloakRoles.Contains("user-manager") || keycloakRoles.Contains("admin")))
            return Forbid();

        return Ok(order);
    }


    [AllowAnonymous]
    [Produces("application/json")]
    [HttpGet("card-types")]
    [ProducesResponseType((int)HttpStatusCode.NoContent)]
    [ProducesResponseType(typeof(IEnumerable<CardTypeViewModel>), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> GetCardsTypes()
    {
        var query = new GetCardTypesQuery();
        var result = await _mediator.Send(query);

        if (!result.Any())
            return NoContent();

        return Ok(result);
    }
}