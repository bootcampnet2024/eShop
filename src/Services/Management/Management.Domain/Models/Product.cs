namespace Management.Domain.Models
{
    public class Product
    {
        public Guid Id { get; set; } 
        public string Name { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public string ImageURL { get; set; }
        public bool IsActive { get; set; }
        public Brand Brand { get; set; }
        public Category Category { get; set; }
    }
}
