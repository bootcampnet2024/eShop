using Management.Domain.Models;
using MediatR;

namespace Management.API.Models.Requests
{
    public class CreateProductRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public string ImageURL { get; set; }
        public int BrandId { get; set; }
        public int CategoryId { get; set; }
    }
}
