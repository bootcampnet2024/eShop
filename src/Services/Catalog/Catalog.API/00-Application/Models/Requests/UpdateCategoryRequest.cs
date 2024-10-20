namespace Catalog.API._00_Application.Models.Requests
{
    public class UpdateCategoryRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageURL { get; set; }
    }
}
