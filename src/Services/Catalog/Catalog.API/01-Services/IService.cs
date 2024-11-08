using Catalog.API._01_Services.DTOs;
using Catalog.API.Controllers.Filters;

namespace Catalog.API._01_Services
{
    public interface IService<T, ID> where T : class
    {
        Task<CatalogDataDTO<T>> GetAll(GenericFilter filter);
        Task<T> GetById(ID id);
        Task<CatalogDataDTO<T>> GetByName(string name, GenericFilter filter);
        Task<int> GetCount();
        Task<bool> Add(T entity);
        Task<bool> Update(T entity);
        Task<bool> Disable(ID id);
    }
}