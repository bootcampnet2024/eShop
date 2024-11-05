using System.ComponentModel.DataAnnotations;

namespace Basket.API._01_Services.Models
{
    public class UserBasket
    {
        [Key]
        public Guid UserId { get; set; }

        public string UserName { get; set; }
    }
}
