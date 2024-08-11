using Basket.API._01_Services.DTOs;
using Basket.API._02_Infrastructure.Data;
using Basket.API._01_Services.Models;
using System.Linq;

namespace Basket.API._01_Services
{
    public class BasketService
    {
        private readonly ApplicationDbContext _context;

        public BasketService(ApplicationDbContext context)
        {
            _context = context;
        }

        public void AddToCart(CartItemDTO item)
        {
            var cartItem = _context.CartItems.FirstOrDefault(ci => ci.ProductId == item.ProductId);
            if (cartItem == null)
            {
                _context.CartItems.Add(new CartItem
                {
                    ProductId = item.ProductId,
                    Name = item.Name,
                    Description = item.Description,
                    Price = item.Price,
                    Quantity = item.Quantity
                });
            }
            else
            {
                cartItem.Quantity += item.Quantity;
                cartItem.Name = item.Name;
                cartItem.Description = item.Description;
                cartItem.Price = item.Price;
            }
            _context.SaveChanges();
        }

        public void UpdateCartItem(CartItemDTO item)
        {
            var cartItem = _context.CartItems.FirstOrDefault(ci => ci.ProductId == item.ProductId);
            if (cartItem != null)
            {
                cartItem.Quantity = item.Quantity;
                cartItem.Name = item.Name;
                cartItem.Description = item.Description;
                cartItem.Price = item.Price;
                _context.SaveChanges();
            }
        }

        public void RemoveFromCart(int productId)
        {
            var cartItem = _context.CartItems.FirstOrDefault(ci => ci.ProductId == productId);
            if (cartItem != null)
            {
                _context.CartItems.Remove(cartItem);
                _context.SaveChanges();
            }
        }
    }
}
