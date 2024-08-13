using Management.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Management.Domain.Repositories
{
    public interface ICategoryRepository : IRepository<Category, int>
    {
    }
}
