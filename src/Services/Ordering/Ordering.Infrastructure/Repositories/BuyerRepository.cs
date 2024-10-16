using Microsoft.EntityFrameworkCore;
using Ordering.Domain.AggregatesModel.BuyerAggregate;
using Ordering.Domain.Kernel;
using Ordering.Infrastructure.Data;

namespace Ordering.Infrastructure.Repositories;

public class BuyerRepository(ApplicationDbContext dbContext) : IBuyerRepository
{
    private readonly DbSet<Buyer> _buyers = dbContext.Buyers;
    public IUnitOfWork UnitOfWork => dbContext;

    public Buyer Add(Buyer buyer)
    {
        if (buyer.IsTransient())
            return _buyers.Add(buyer).Entity;

        return buyer;
    }

    public async Task<Buyer> FindAsync(string buyerIdentityGuid)
    {
        return await _buyers.Include(b => b.PaymentMethods).AsNoTracking().FirstOrDefaultAsync(b => b.IdentityGuid == buyerIdentityGuid);
    }

    public async Task<Buyer> FindByIdAsync(int id)
    {
        var buyer = await _buyers.FindAsync(id);

        if (buyer is null)
            return null;

        await _buyers.Entry(buyer).Collection(i => i.PaymentMethods).LoadAsync();

        return buyer;
    }

    public Buyer Update(Buyer buyer)
    {
        if (buyer.IsTransient())
            return null;

        return _buyers.Update(buyer).Entity;
    }
}
