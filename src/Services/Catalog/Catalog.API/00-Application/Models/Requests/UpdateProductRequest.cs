﻿namespace Catalog.API._00_Application.Models.Requests
{
    public class UpdateProductRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string ImageURL { get; set; }
        public bool IsActive { get; set; }
        public bool IsHighlighted { get; set; }
        public int BrandId { get; set; }
        public int CategoryId { get; set; }
    }
}
