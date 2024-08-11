using System.ComponentModel.DataAnnotations;

namespace Basket.API._01_Services.Models
{
    public class CartItem
    {
        [Key]
        public int ProductId { get; set; }
        [Required]
        public string Name { get; set; }  

        public string Description { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "O preço deve ser maior que zero.")]
        public decimal Price { get; set; }  

        [Required]
        public int Quantity { get; set; }
    }
}
