using Basket.API._01_Services.DTOs;
using Basket.API._02_Infrastructure.Data;
using Basket.API._01_Services.Models;
using Microsoft.EntityFrameworkCore;

<<<<<<< HEAD

=======
>>>>>>> 3d08911f09ad6b1074ea952367ef6a39524fc25a
namespace Basket.API._01_Services
{
    public class BasketService : IBasketService
    {
        private readonly ApplicationDbContext _context;

        public BasketService(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Add(CartItemDTO item, string userId)
        {
            var cartItem = _context.CartItems
                .AsNoTracking()  
                .FirstOrDefault(ci => ci.ProductId == item.ProductId && ci.UserId == userId);

            if (cartItem == null)
            {
                _context.CartItems.Add(new CartItem
                {
                    ProductId = item.ProductId,
                    UserId = userId,
                    Name = item.Name,
                    Description = item.Description,
                    Price = item.Price,
                    Quantity = item.Quantity,
                    Image = item.Image
                });
            }
            else
            {
<<<<<<< HEAD


=======
                _context.CartItems.Attach(cartItem);
>>>>>>> 3d08911f09ad6b1074ea952367ef6a39524fc25a
                cartItem.Quantity += item.Quantity;
                cartItem.Name = item.Name;
                cartItem.Description = item.Description;
                cartItem.Price = item.Price;
                cartItem.Image = item.Image;
            }

            _context.SaveChanges();
        }

        public void UpdateItem(CartItemDTO item, string userId)
        {
            var cartItem = _context.CartItems
                .FirstOrDefault(ci => ci.ProductId == item.ProductId && ci.UserId == userId);

            if (cartItem != null)
            {
                cartItem.Quantity = item.Quantity;
                cartItem.Name = item.Name;
                cartItem.Description = item.Description;
                cartItem.Price = item.Price;
                cartItem.Image = item.Image;
                _context.SaveChanges();
            }
        }

        public void Remove(int productId, string userId)
        {
            var cartItem = _context.CartItems
                .FirstOrDefault(ci => ci.ProductId == productId && ci.UserId == userId);

            if (cartItem != null)
            {
                _context.CartItems.Remove(cartItem);
                _context.SaveChanges();
            }
        }

        public List<CartItemDTO> GetItems(string userId)
        {
            return _context.CartItems
                .AsNoTracking()  
<<<<<<< HEAD

=======
>>>>>>> 3d08911f09ad6b1074ea952367ef6a39524fc25a
                .Where(ci => ci.UserId == userId)
                .Select(ci => new CartItemDTO
                {
                    ProductId = ci.ProductId,
                    Name = ci.Name,
                    Description = ci.Description,
                    Price = ci.Price,
                    Quantity = ci.Quantity,
                    Image = ci.Image
                }).ToList();
        }
    }
}
