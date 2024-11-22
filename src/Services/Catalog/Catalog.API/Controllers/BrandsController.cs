using Catalog.API._00_Application.Models.Requests;
using Catalog.API._00_Application.Operations.Commands.BrandCommands;
using Catalog.API._00_Application.Operations.Queries.BrandQueries;
using Catalog.API._00_Application.Result;
using Catalog.API.Controllers.Filters;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Catalog.API.Controllers
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
        public async Task<IActionResult> GetAll([FromQuery] GenericFilter filter)
        {
            var query = new GetAllBrandsQuery(filter);
            var result = await _mediator.Send(query);

            return Ok(new CatalogDataResult<CatalogBrandResult> { Items = result.Items.Select(CatalogBrandResult.FromDTO), TotalItems = result.TotalItems });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var query = new GetBrandByIdQuery(id);
            var result = await _mediator.Send(query);
            return Ok(CatalogBrandResult.FromDTO(result));
        }

        [HttpGet("name/{name}")]
        public async Task<IActionResult> GetByName(string name, [FromQuery] GenericFilter filter)
        {
            var query = new GetBrandsByNameQuery(name, filter);
            var result = await _mediator.Send(query);
            return Ok(new CatalogDataResult<CatalogBrandResult> { Items = result.Items.Select(CatalogBrandResult.FromDTO), TotalItems = result.TotalItems });
        }

        [HttpGet("count/")]
        public async Task<IActionResult> GetCount()
        {
            var query = new GetCountBrandsQuery();
            var result = await _mediator.Send(query);
            return Ok(result);
        }   

        [HttpGet("category/{id:int}")]
        public async Task<IActionResult> GetByCategoryId(int id)
        {
            var query = new GetBrandsByCategoryIdQuery(id);
            var result = await _mediator.Send(query);

            if (!result.Any())
                return NoContent();

            return Ok(result.Select(CatalogBrandResult.FromDTO));
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
