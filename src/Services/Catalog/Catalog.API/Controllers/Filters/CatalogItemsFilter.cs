namespace Catalog.API.Controllers.Filters;

public class CatalogItemsFilter
{
    /* Isso sempre é instanciado com os valores padrões dos primitivos,
     * mesmo se na controller usa-se "= null" como parâmetro padrão.
     * O verificador de nulo é usado para os testes. */
    public bool ShowOnlyHighlighted { get; set; } = true;
    public int PageSize { get; set; } = 10;
    public int CategoryId { get; set; } = 0;
    public int PageIndex { get; set; } = 0;
}
