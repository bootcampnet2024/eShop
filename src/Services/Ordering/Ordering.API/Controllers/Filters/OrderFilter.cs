namespace Ordering.API.Controllers.Filters
{
    public class OrderFilter
    {
        public int PageSize { get; set; } = 10;
        public int PageIndex { get; set; } = 0;

        public int BuyerId { get; set; } = 0;
    }
}
