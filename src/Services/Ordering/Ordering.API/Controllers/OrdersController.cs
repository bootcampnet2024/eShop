using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ordering.API.Application.Commands;
using Ordering.API.Application.Models.DTOs.Orders;
using Ordering.API.Application.Queries;
using Ordering.API.Application.Requests;
using Ordering.API.Application.ViewModels.Orders;
using Ordering.API.Controllers.Core;
using Ordering.API.Controllers.Filters;
using Ordering.Domain.AggregatesModel.BuyerAggregate;
using Ordering.Domain.AggregatesModel.OrderAggregate;
using Ordering.Domain.Kernel;
using System.Net;
using System.Security.Claims;

namespace Ordering.API.Controllers;

/*
Reference APIs
/ - GET
/cancel/{orderId:int} - POST
/ship/{orderId:int} - POST
/orderId/{orderId:int} - GET
/buyerId/{buyerId:int} - GET
/card-types - GET
/draft - POST
*/
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class OrdersController(ILogger<OrdersController> logger, IMediator mediator) : ControllerBase
{
    private readonly ILogger<OrdersController> _logger = logger;
    private readonly IMediator _mediator = mediator;

    [HttpGet]
    [Produces("application/json")]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType((int)HttpStatusCode.Forbidden)]
    [ProducesResponseType((int)HttpStatusCode.NoContent)]
    [ProducesResponseType(typeof(IEnumerable<OrderViewModel>), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> GetAll([FromQuery] OrderFilter orderFilter)
    {
        var userId = User.FindFirstValue(OrderingIdentityConstants.USER_ID_CLAIM_NAME);

        if (userId is null)
            return Unauthorized();

        var isUserIsAdmin = User.IsInRole("manage-users");

        if (!isUserIsAdmin)
            return Forbid();

        var query = 0;
        var operationResult = new List<OrderDTO>();

        if (!operationResult.Any())
            return NoContent();

        return Ok(operationResult.Select(OrderViewModel.FromDTO));
    }

    [HttpPost]
    [Produces("application/json")]
    [Route("draft")]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType(typeof(OrderDraftDTO), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> CreateOrderDraft([FromBody] CreateOrderDraftRequest request)
    {
        var userId = User.FindFirstValue(OrderingIdentityConstants.USER_ID_CLAIM_NAME);

        if (userId is null)
            return Unauthorized();

        _logger.LogInformation(
            "Sending command: {CommandName} - {IdProperty}: {CommandId} ({@Command})",
            "CreateOrderDraftCommand",
            nameof(userId),
            userId,
            request);

        var command = new CreateOrderDraftCommand(userId, request.Items);
        var operationResult = await _mediator.Send(command);

        if (operationResult is null)
            return BadRequest();

        return CreatedAtAction(nameof(GetOrderById), new { operationResult.Id }, operationResult);
    }

    [HttpPatch]
    [Produces("application/json")]
    [Route("cancel/{orderId:int}")]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType((int)HttpStatusCode.Forbidden)]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    [ProducesResponseType((int)HttpStatusCode.BadRequest)]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    public async Task<IActionResult> CancelOrder(int orderId)
    {
        var userId = User.FindFirstValue(OrderingIdentityConstants.USER_ID_CLAIM_NAME);

        if (userId is null)
            return Unauthorized();

        var isUserIsAdmin = User.IsInRole("manage-users");

        if (!isUserIsAdmin)
            return Forbid();

        _logger.LogInformation(
            "Sending command: {CommandName} - {IdProperty}: {CommandId}",
            "CancelOrderCommand",
            nameof(orderId),
            orderId);

        var command = new CancelOrderCommand(isUserIsAdmin, orderId);
        var operationResult = await _mediator.Send(command);

        if (operationResult is null)
            return NotFound();

        if (operationResult.OrderStatus != OrderStatus.Cancelled)
            return BadRequest();

        return Ok();
    }

    [HttpPatch]
    [Produces("application/json")]
    [Route("ship/{orderId:int}")]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType((int)HttpStatusCode.Forbidden)]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    [ProducesResponseType((int)HttpStatusCode.BadRequest)]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    public async Task<IActionResult> ShipOrder(int orderId)
    {
        var userId = User.FindFirstValue(OrderingIdentityConstants.USER_ID_CLAIM_NAME);

        if (userId is null)
            return Unauthorized();

        var isUserIsAdmin = User.IsInRole("manage-users");

        if (!isUserIsAdmin)
            return Forbid();

        _logger.LogInformation(
            "Sending command: {CommandName} - {IdProperty}",
            "ShipOrderCommand",
            nameof(orderId));

        var command = new ShipOrderCommand(isUserIsAdmin, orderId);
        var operationResult = await _mediator.Send(command);

        if (operationResult is null)
            return NotFound();

        if (operationResult.OrderStatus != OrderStatus.Shipped)
            return BadRequest();

        return Ok();
    }

    [HttpGet]
    [Produces("application/json")]
    [Route("orderId/{orderId:int}")]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType((int)HttpStatusCode.Forbidden)]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    [ProducesResponseType(typeof(OrderViewModel), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> GetOrderById(int orderId)
    {
        var userId = User.FindFirstValue(OrderingIdentityConstants.USER_ID_CLAIM_NAME);

        if (userId is null)
            return Unauthorized();

        _logger.LogInformation(
            "Sending query: {QueryName} - {IdProperty}",
            "GetOrderByIdQuery",
            nameof(orderId));

        var isUserIsAdmin = User.IsInRole("manage-users");

        var query = new GetOrderByIdQuery(orderId);
        var operationResult = await _mediator.Send(query);

        if (operationResult is null)
            return NotFound();

        if (!isUserIsAdmin && operationResult.BuyerId != userId)
            return Forbid();

        return Ok(OrderViewModel.FromDTO(operationResult));
    }

    [HttpGet]
    [Produces("application/json")]
    [Route("buyerId/{buyerId}")]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType((int)HttpStatusCode.Forbidden)]
    [ProducesResponseType((int)HttpStatusCode.NoContent)]
    [ProducesResponseType(typeof(IEnumerable<OrderViewModel>), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> GetOrdersByBuyerId(string buyerId)
    {
        var userId = User.FindFirstValue(OrderingIdentityConstants.USER_ID_CLAIM_NAME);

        if (userId is null)
            return Unauthorized();

        var isUserIsAdmin = User.IsInRole("manage-users");

        _logger.LogInformation(
           "Sending query: {QueryName} - {IdProperty}",
           "GetOrdersByBuyerIdQuery",
           nameof(buyerId));

        if (!isUserIsAdmin && userId != buyerId)
            return Forbid();

        var query = new GetOrdersByBuyerIdQuery(buyerId);
        var operationResult = await _mediator.Send(query);

        if (!operationResult.Any())
            return NoContent();

        return Ok(operationResult.Select(OrderViewModel.FromDTO));
    }

    [HttpGet]
    [AllowAnonymous]
    [Route("card-types")]
    [Produces("application/json")]
    [ProducesResponseType(typeof(IEnumerable<CardTypeViewModel>), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> GetCardTypes()
    {
        var cardTypes = await Task.FromResult(Enumeration.GetAll<CardType>().Select(CardTypeDTO.FromCardType));

        return Ok(cardTypes.Select(CardTypeViewModel.FromDTO));
    }
}
