using Basket.API._01_Services;
using Basket.API._01_Services.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Basket.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BasketController : ControllerBase
    {
        private readonly BasketService _basketService;

        public BasketController(BasketService basketService)
        {
            _basketService = basketService;
        }

        [HttpPost("add")]
        public IActionResult AddToCart([FromBody] CartItemDTO item)
        {
            _basketService.AddToCart(item);
            return Ok();    
        }

        [HttpPut("update")]
        public IActionResult UpdateCartItem([FromBody] CartItemDTO item)
        {
            _basketService.UpdateCartItem(item);    
            return Ok();
        }

        [HttpDelete("remove/{productId}")]
        public IActionResult RemoveFromCart(int productId)
        {
            _basketService.RemoveFromCart(productId);
            return Ok();
        }

    }
}
