﻿using Basket.API._01_Services.DTOs;
using Basket.API._01_Services.Models;
using Basket.API._02_Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

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
                .FirstOrDefault(ci => ci.CatalogProductId == item.ProductId && ci.UserId == userId);

            if (cartItem != null) return;

            _context.CartItems.Add(new CartItem
            {
                CatalogProductId = item.ProductId,
                UserId = userId,
                Name = item.Name,
                Description = item.Description,
                Price = item.Price,
                Quantity = item.Quantity,
                ImageURL = item.ImageURL
            });

            _context.SaveChanges();
        }


        public void Update(CartItemDTO item, string userId)
        {
            var cartItem = _context.CartItems
                .FirstOrDefault(ci => ci.CatalogProductId == item.ProductId && ci.UserId == userId);

            if (cartItem != null)
            {
                cartItem.Quantity = item.Quantity;
                cartItem.Name = item.Name;
                cartItem.Description = item.Description;
                cartItem.Price = item.Price;
                cartItem.ImageURL = item.ImageURL;
                _context.CartItems.Update(cartItem);
                _context.SaveChanges();
            }
        }

        public void Remove(string productId, string userId)
        {
            var cartItem = _context.CartItems
                .FirstOrDefault(ci => ci.CatalogProductId == productId && ci.UserId == userId);

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
                .Where(ci => ci.UserId == userId)
                .Select(ci => new CartItemDTO
                {
                    ProductId = ci.CatalogProductId,
                    Name = ci.Name,
                    Description = ci.Description,
                    Price = ci.Price,
                    Quantity = ci.Quantity,
                    ImageURL = ci.ImageURL
                }).ToList();
        }
    }
}
