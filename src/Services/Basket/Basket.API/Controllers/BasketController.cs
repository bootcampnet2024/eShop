using Basket.API._01_Services;
using Basket.API._01_Services.DTOs;
using Microsoft.AspNetCore.Mvc;
using System;

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

        [HttpPost("add/{userId}")]
        public IActionResult AddToCart(string userId, [FromBody] CartItemDTO item)
        {
            try
            {
                _basketService.AddToCart(item, userId);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding item to cart");
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("items/{userId}")]
        public IActionResult GetCartItems(string userId)
        {
            try
            {
                var items = _basketService.GetCartItems(userId);
                return Ok(items);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting cart items");
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut("update")]
        public IActionResult UpdateCartItem(string userId, [FromBody] CartItemDTO item)
        {
            try
            {
                _basketService.UpdateCartItem(item, userId);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating cart item");
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("remove/{userId}/{productId}")]
        public IActionResult RemoveFromCart(string userId, int productId)
        {
            try
            {
                _basketService.RemoveFromCart(productId, userId);
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
