using MediatR;
using Microsoft.AspNetCore.Mvc;
using Ordering.API.Application.Commands;
using Ordering.API.Application.Models.DTOs;
using Ordering.API.Application.Requests;
using System.Net;

namespace Ordering.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrdersController(ILogger<OrdersController> logger, IMediator mediator) : ControllerBase
    {
        /*
         * Reference APIs
        /
        /cancel
        /ship
        /{orderId:int}
        /card-types
        /draft
       */

        private readonly ILogger<OrdersController> _logger = logger;
        private readonly IMediator _mediator = mediator;

        [HttpPost]
        [Route("draft")]
        [ProducesResponseType(typeof(OrderDraftDTO), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> CreateOrderDraft(CreateOrderDraftRequest request)
        {
            _logger.LogInformation(
                "Sending command: {CommandName} - {IdProperty}: {CommandId} ({@Command})",
                "CreateOrderDraftCommand",
                nameof(request.BuyerId),
                request.BuyerId,
                request);

            var command = new CreateOrderDraftCommand(request.BuyerId, request.Items);
            var operationResult = await _mediator.Send(command);
            if (operationResult == null)
                return BadRequest();

            return Ok(operationResult);
        }
    }
}