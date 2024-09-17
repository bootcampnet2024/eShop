namespace Management.API.Results
{
    public class ProductResult
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public string ImageURL { get; set; }
        public bool IsActive { get; set; }
        public string Brand { get; set; }
        public string Category { get; set; }
    }
}
