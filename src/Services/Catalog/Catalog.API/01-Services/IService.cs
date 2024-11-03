namespace Catalog.API._01_Services
{
    public interface IService<T, ID> where T : class
    {
        Task<IEnumerable<T>> GetAll();
        Task<T> GetById(ID id);
        Task<IEnumerable<T>> GetByName(string name);
        Task<int> GetCount();
        Task<bool> Add(T entity);
        Task<bool> Update(T entity);
        Task<bool> Delete(ID id);
    }
}