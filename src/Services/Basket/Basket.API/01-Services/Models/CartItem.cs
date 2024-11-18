using System.ComponentModel.DataAnnotations;

namespace Basket.API._01_Services.Models
{
    public class CartItem
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string CatalogProductId { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        public string Name { get; set; }

        public string ImageURL { get; set; }

        public string Description { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "O preço deve ser maior que zero.")]
        public decimal Price { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "A quantidade deve ser pelo menos 1.")]
        public int Quantity { get; set; }

        [Required]
        [Range(0, 100, ErrorMessage = "O desconto deve estar entre 0 e 100")]
        public int Discount { get; set; }
    }
}
