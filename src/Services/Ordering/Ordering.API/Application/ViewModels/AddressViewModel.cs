using Ordering.Domain.AggregatesModel.OrderAggregate;

namespace Ordering.API.Application.ViewModels;

public record AddressViewModel
{
    public string Street { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string Country { get; set; }
    public string ZipCode { get; set; }

    public static AddressViewModel FromModel(Address address)
    {
        return new AddressViewModel()
        {
            Street = address.Street,
            City = address.City,
            State = address.State,
            ZipCode = address.ZipCode,
            Country = address.Country
        };
    }
}
