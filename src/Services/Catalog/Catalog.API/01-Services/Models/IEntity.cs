namespace Catalog.API._01_Services.Models
{
    public interface IEntity<ID>
    {
        public ID Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; } 
        public DateTime UpdatedAt { get; set; }
    }
}
