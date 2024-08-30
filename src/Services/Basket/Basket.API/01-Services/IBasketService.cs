using Basket.API._01_Services.DTOs;
using System.Collections.Generic;

namespace Basket.API._01_Services
{
    public interface IBasketService
    {
        void Add(CartItemDTO item, string userId);
        void UpdateItem(CartItemDTO item, string userId);
        void Remove(int productId, string userId);
        List<CartItemDTO> GetItems(string userId);
    }
}
