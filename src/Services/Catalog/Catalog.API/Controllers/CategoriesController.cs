using Catalog.API._00_Application.Models.Requests;
using Catalog.API._00_Application.Operations.Commands.CategoryCommands;
using Catalog.API._00_Application.Operations.Queries.CategoryQueries;
using Catalog.API._00_Application.Operations.Queries.CategoryQueries.Handlers;
using Catalog.API._00_Application.Result;
using Catalog.API.Controllers.Filters;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Catalog.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoriesController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        [HttpPost]
        public async Task<IActionResult> Add(CreateCategoryRequest request)
        {
            var command = new CreateCategoryCommand(request);

            var result = await _mediator.Send(command);

            if (result) return Ok("Category created successfully");

            return BadRequest("Failed to create category");
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] GenericFilter filter)
        {
            var query = new GetAllCategoriesQuery(filter);
            var result = await _mediator.Send(query);
            return Ok(new CatalogDataResult<CatalogCategoryResult> { Items = result.Items.Select(CatalogCategoryResult.FromDTO), TotalItems = result.TotalItems });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var query = new GetCategoryByIdQuery(id);
            var result = await _mediator.Send(query);

            return Ok(CatalogCategoryResult.FromDTO(result));
        }

        [HttpGet("name/{name}")]
        public async Task<IActionResult> GetByName(string name, [FromQuery] GenericFilter filter)
        {
            var query = new GetCategoriesByNameQuery(name, filter);
            var result = await _mediator.Send(query);

            return Ok(new CatalogDataResult<CatalogCategoryResult> { Items = result.Items.Select(CatalogCategoryResult.FromDTO), TotalItems = result.TotalItems });
        }

        [HttpGet("count/")]
        public async Task<IActionResult> GetCount()
        {
            var query = new GetCountCategoriesQuery();
            var result = await _mediator.Send(query);

            return Ok(result);
        }

        [HttpGet("name/{name}")]
        public async Task<IActionResult> GetByName(string name)
        {
            var query = new GetCategoriesByNameQuery(name);
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Update(int id, UpdateCategoryRequest request)
        {
            var command = new UpdateCategoryCommand(id, request);

            var result = await _mediator.Send(command);

            if (result) return Ok("Category updated successfully");

            return BadRequest("Failed to update Category");
        }
    }
}
