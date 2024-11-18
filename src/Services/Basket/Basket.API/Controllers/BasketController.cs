using Basket.API._01_Services;
using Basket.API._01_Services.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Basket.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BasketController : ControllerBase
    {
        private readonly IBasketService _basketService;
        private readonly ILogger<BasketController> _logger;

        public BasketController(IBasketService basketService, ILogger<BasketController> logger)
        {
            _basketService = basketService;
            _logger = logger;
        }

        [HttpPost("{userId}")]
        public IActionResult Add(string userId, [FromBody] CartItemDTO item)
        {
            try
            {
                _basketService.Add(item, userId);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding item to cart");
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("{userId}")]
        public IActionResult GetItems(string userId)
        {
            try
            {
                var items = _basketService.GetItems(userId);
                return Ok(items);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting cart items");
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut("{userId}")]
        public IActionResult Update(string userId, [FromBody] CartItemDTO item)
        {
            try
            {
                _basketService.Update(item, userId);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating cart item");
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("{userId}/{productId}")]
        public IActionResult Remove(string userId, string productId)
        {
            try
            {
                _basketService.Remove(productId, userId);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error removing item from cart");
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
