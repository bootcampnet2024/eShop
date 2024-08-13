using Management.Domain.Models;
using Management.Domain.Repositories;
using Management.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Management.Infrastructure.Repositories
{
    public class ProductRepository(ApplicationDataContext context) : IProductRepository
    {
        public readonly ApplicationDataContext _context = context;
        public async Task<bool> Add(Product product)
        {
            await _context.Products.AddAsync(product);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Delete(Guid id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null) return false;

            product.IsActive = false;
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<Product>> GetAll()
        {
            return await _context.Products.Include(p => p.Category).Include(p => p.Brand).ToListAsync();
        }

        public Task<Product> GetByBrandName(string brandName)
        {
            throw new NotImplementedException();
        }

        public Task<Product> GetByCategoryName(string categoryName)
        {
            throw new NotImplementedException();
        }

        public async Task<Product> GetById(Guid id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null) return null;

            await _context.Entry(product).Reference(p => p.Category).LoadAsync();
            await _context.Entry(product).Reference(p => p.Brand).LoadAsync();

            return product;
        }

        public async Task<IEnumerable<Product>> GetByName(string name)
        {
            return await _context.Products
                .OrderByDescending(p => p.IsActive)
                .Include(p => p.Category)
                .Include(p => p.Brand)
                .Where(p => p.Name.ToLower().Contains(name.ToLower()))
                .ToListAsync();
        }

        public async Task<bool> Update(Guid id, Product product)
        {
            var productId = await _context.Products.FindAsync(id);

            if (productId == null) return false;

            _context.Products.Update(productId);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
