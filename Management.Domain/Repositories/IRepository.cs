using Management.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Management.Domain.Repositories
{
    public interface IRepository<T, ID> where T : class
    {
        Task<IEnumerable<T>> GetAll();
        Task<T> GetById(ID id);
        Task<IEnumerable<T>> GetByName(string name);
        Task<bool> Add(T entity);
        Task<bool> Update(ID id, T entity);
        Task<bool> Delete(ID id);
    }
}
