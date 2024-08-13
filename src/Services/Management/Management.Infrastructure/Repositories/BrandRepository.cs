using Management.Domain.Models;
using Management.Domain.Repositories;
using Management.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Management.Infrastructure.Repositories
{
    public class BrandRepository(ApplicationDataContext context) : IBrandRepository
    {
        public readonly ApplicationDataContext _context = context;
        public async Task<bool> Add(Brand brand)
        {
            await _context.Brands.AddAsync(brand);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Delete(int id)
        {
            var brand = await _context.Brands.FindAsync(id);

            if (brand == null) return false;

            _context.Brands.Remove(brand);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<Brand>> GetAll()
        {
            return await _context.Brands.ToListAsync();
        }

        public async Task<Brand> GetById(int id)
        {
            var category = await _context.Brands.FindAsync(id);

            if (category == null) return null;

            return category;
        }

        public Task<IEnumerable<Brand>> GetByName(string name)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> Update(int id, Brand brand)
        {
            var brandId = await _context.Brands.FindAsync(id);

            if (brandId == null) return false;

            _context.Brands.Update(brandId);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
