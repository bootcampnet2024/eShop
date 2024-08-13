using Management.API.Models.Requests;
using Management.API.Operations.Commands.BrandCommands;
using Management.API.Operations.Commands.CategoryCommands;
using Management.API.Operations.Commands.ProductCommands;
using Management.API.Operations.Queries.BrandQueries;
using Management.API.Operations.Queries.CategoryQueries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Management.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController(IMediator mediator) : ControllerBase
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
        public async Task<IActionResult> GetAll()
        {
            var query = new GetAllCategoriesQuery();
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
