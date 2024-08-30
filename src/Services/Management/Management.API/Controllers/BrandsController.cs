using Management.API.Models.Requests;
using Management.API.Operations.Commands.BrandCommands;
using Management.API.Operations.Commands.ProductCommands;
using Management.API.Operations.Queries.BrandQueries;
using Management.API.Operations.Queries.CategoryQueries;
using Management.API.Operations.Queries.ProductQueries;
using Management.Domain.Repositories;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Management.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BrandsController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        [HttpPost]
        public async Task<IActionResult> Add(CreateBrandRequest request)
        {
            var command = new CreateBrandCommand(request);

            var result = await _mediator.Send(command);

            if (result) return Ok("Brand created successfully");

            return BadRequest("Failed to create brand");
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var query = new GetAllBrandsQuery();
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var query = new GetBrandsByIdQuery(id);
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Update(int id, UpdateBrandRequest request)
        {
            var command = new UpdateBrandCommand(id, request);

            var result = await _mediator.Send(command);

            if (result) return Ok("Brand updated successfully");

            return BadRequest("Failed to update brand");
        }
    }
}
