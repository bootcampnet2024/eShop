using Management.Domain.Models;
using Management.Domain.Repositories;
using Management.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Management.Infrastructure.Repositories
{
    public class CategoryRepository(ApplicationDataContext context) : ICategoryRepository
    {
        public readonly ApplicationDataContext _context = context;
        public async Task<bool> Add(Category category)
        {
            await _context.Categories.AddAsync(category);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Delete(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null) return false;

            _context.Categories.Remove(category);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<Category>> GetAll()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<Category> GetById(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null) return null;

            return category;
        }

        public Task<IEnumerable<Category>> GetByName(string name)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> Update(int id, Category category)
        {
            var categoryId = await _context.Categories.FindAsync(id);

            if (categoryId == null) return false;

            _context.Categories.Update(categoryId);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
