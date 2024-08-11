using Basket.API._01_Services.DTOs;
using System.Collections.Generic;

namespace Basket.API._01_Services
{
    public interface IBasketService
    {
        void AddToCart(CartItemDTO item, string userId);
        void UpdateCartItem(CartItemDTO item, string userId);
        void RemoveFromCart(int productId, string userId);
        List<CartItemDTO> GetCartItems(string userId);
    }
}
