using Management.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Management.Domain.Repositories
{
    public interface IProductRepository : IRepository<Product, Guid>
    {
        Task<Product> GetByCategoryName(string categoryName);
        Task<Product> GetByBrandName(string brandName);
    }
}
