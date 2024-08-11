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
            var fixedUserName = "user"; 

            var userBasket = new UserBasket
            {
                UserId = Guid.NewGuid(),
                UserName = fixedUserName
            };

            _context.UserBaskets.Add(userBasket);
            _context.SaveChanges();

            return userBasket.UserId;
        }
    }
}
