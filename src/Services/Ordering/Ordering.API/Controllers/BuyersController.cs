using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ordering.API.Application.Commands.Buyers;
using Ordering.API.Application.Models.DTOs.Buyers;
using Ordering.API.Application.Queries.Buyers;
using Ordering.API.Application.Requests;
using Ordering.API.Application.ViewModels.Buyers;
using Ordering.API.Controllers.Core;
using System.Net;
using System.Security.Claims;

namespace Ordering.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
/*
Reference APIs
/ - GET
/add-buyer - POST
/add-payment-method/{userId} - POST
/remove-payment-method/{userId} - POST
*/
public class BuyersController(ILogger<BuyersController> logger, IMediator mediator) : ControllerBase
{
    private readonly ILogger<BuyersController> _logger = logger;
    private readonly IMediator _mediator = mediator;

    [HttpGet]
    [Produces("application/json")]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType((int)HttpStatusCode.Forbidden)]
    [ProducesResponseType((int)HttpStatusCode.NoContent)]
    [ProducesResponseType(typeof(IEnumerable<BuyerViewModel>), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> GetAll()
    {
        var userId = User.FindFirstValue(OrderingIdentityConstants.USER_ID_CLAIM_NAME);

        if (userId is null)
            return Unauthorized();

        var isUserIsAdmin = User.IsInRole(OrderingIdentityConstants.Roles.MANAGE_USERS);

        if (!isUserIsAdmin)
            return Forbid();

        var query = 0;
        var operationResult = new List<BuyerDTO>();

        if (!operationResult.Any())
            return NoContent();

        return Ok(operationResult.Select(BuyerViewModel.FromDTO));
    }

    [HttpGet("id/{id:int}")]
    [Produces("application/json")]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType((int)HttpStatusCode.BadRequest)]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    [ProducesResponseType(typeof(BuyerViewModel), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> GetById(int id)
    {
        var userId = User.FindFirstValue(OrderingIdentityConstants.USER_ID_CLAIM_NAME);
        if (userId is null)
            return Unauthorized();

        var isUserIsAdmin = User.IsInRole(OrderingIdentityConstants.Roles.MANAGE_USERS);

        var query = new GetBuyerByIdQuery(userId, isUserIsAdmin, id);
        var operationResult = await _mediator.Send(query);

        if (operationResult is null)
            return NotFound();

        return Ok(BuyerViewModel.FromDTO(operationResult));
    }

    [HttpGet("identity/{identity}")]
    [Produces("application/json")]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType((int)HttpStatusCode.BadRequest)]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    [ProducesResponseType(typeof(BuyerViewModel), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> GetByIdentity(string identity)
    {
        var userId = User.FindFirstValue(OrderingIdentityConstants.USER_ID_CLAIM_NAME);

        if (userId is null)
            return Unauthorized();

        var isUserIsAdmin = User.IsInRole(OrderingIdentityConstants.Roles.MANAGE_USERS);

        var query = new GetBuyerByIdentityQuery(userId, isUserIsAdmin, identity);
        var operationResult = await _mediator.Send(query);

        if (operationResult is null)
            return NotFound();
        return Ok(BuyerViewModel.FromDTO(operationResult));
    }

    [HttpPost("add-buyer")]
    [Produces("application/json")]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType((int)HttpStatusCode.BadRequest)]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    public async Task<IActionResult> AddBuyer()
    {
        var userId = User.FindFirstValue(OrderingIdentityConstants.USER_ID_CLAIM_NAME);

        if (userId is null)
            return Unauthorized();
        var userName = User.FindFirstValue(OrderingIdentityConstants.USER_NAME_CLAIM_NAME)!;

        var command = new AddBuyerCommand(userId, userName);

        var operationResult = await _mediator.Send(command);

        if (operationResult is null)
            return BadRequest("User is not registered in the database.");

        return CreatedAtAction(nameof(GetById), new { operationResult.Id }, BuyerViewModel.FromDTO(operationResult));
    }

    [HttpPost("add-payment-method")]
    [Produces("application/json")]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType((int)HttpStatusCode.BadRequest)]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    public async Task<IActionResult> AddPaymentMethod([FromBody] AddPaymentMethodRequest request)
    {
        var userId = User.FindFirstValue(OrderingIdentityConstants.USER_ID_CLAIM_NAME);

        if (userId is null)
            return Unauthorized();

        var userName = User.FindFirstValue(OrderingIdentityConstants.USER_NAME_CLAIM_NAME)!;

        var command = new AddPaymentMethodCommand(userId, userName, request);

        var operationResult = await _mediator.Send(command);

        if (operationResult is null)
            return BadRequest("User is not registered in the database.");

        return Ok(PaymentMethodViewModel.FromDTO(operationResult));
    }

    [HttpPost("remove-payment-method")]
    [Produces("application/json")]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType((int)HttpStatusCode.BadRequest)]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    public async Task<IActionResult> RemovePaymentMethod([FromBody] RemovePaymentMethodRequest request)
    {
        var userId = User.FindFirstValue(OrderingIdentityConstants.USER_ID_CLAIM_NAME);
        if (userId is null)
            return Unauthorized();
        var userName = User.FindFirstValue(OrderingIdentityConstants.USER_NAME_CLAIM_NAME)!;

        var command = new RemovePaymentMethodCommand(userId, userName, request);
        var operationResult = await _mediator.Send(command);
        if (operationResult is null)
            return BadRequest("User is not registered in the database.");
        return Ok(PaymentMethodViewModel.FromDTO(operationResult));
    }
}
