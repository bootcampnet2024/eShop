using Microsoft.EntityFrameworkCore;
using Ordering.Domain.AggregatesModel.BuyerAggregate;
using Ordering.Domain.Kernel;
using Ordering.Infrastructure.Data;

namespace Ordering.Infrastructure.Repositories;

public class BuyerRepository(ApplicationDbContext dbContext) : IBuyerRepository
{
    private readonly DbSet<Buyer> _buyers = dbContext.Buyers;

    public IUnitOfWork UnitOfWork => dbContext;

    public Buyer? Add(Buyer buyer)
    {
        if (buyer.IsTransient())
        {
            return _buyers.Add(buyer).Entity;
        }
        return null;
    }

    public async Task<Buyer?> FindAsync(string buyerIdentityGuid)
    {
        return await _buyers.AsNoTracking().FirstOrDefaultAsync(b => b.IdentityGuid == buyerIdentityGuid);
    }

    public async Task<Buyer?> FindByIdAsync(int id)
    {
        return await _buyers.FindAsync(id);
    }

    public Buyer Update(Buyer buyer)
    {
        return _buyers.Update(buyer).Entity;
    }
}
