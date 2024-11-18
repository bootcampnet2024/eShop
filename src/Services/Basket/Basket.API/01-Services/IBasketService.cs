using Basket.API._01_Services.DTOs;

namespace Basket.API._01_Services
{
    public interface IBasketService
    {
        void Add(CartItemDTO item, string userId);
        void Update(CartItemDTO item, string userId);
        void Remove(string productId, string userId);
        List<CartItemDTO> GetItems(string userId);
    }
}
