using Basket.API._01_Services.Models;
using Basket.API._02_Infrastructure.Data;
using System;

namespace Basket.API._01_Services
{
    public class UserBasketService
    {
        private readonly ApplicationDbContext _context;

        public UserBasketService(ApplicationDbContext context)
        {
            _context = context;
        }

        public Guid CreateNewBasket()
        {
            var fixedUserid = "0f3c1a15-9bf4-4fca-8a71-2f1dee58cc99"; 

            var userBasket = new UserBasket
            {
                UserId = Guid.NewGuid(),
                UserName = fixedUserid
            };

            _context.UserBaskets.Add(userBasket);
            _context.SaveChanges();

            return userBasket.UserId;
        }
    }
}
