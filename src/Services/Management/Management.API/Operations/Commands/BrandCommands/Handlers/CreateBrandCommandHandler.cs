using Management.Domain.Models;
using Management.Domain.Repositories;
using MediatR;

namespace Management.API.Operations.Commands.BrandCommands.Handlers
{
    public class CreateBrandCommandHandler(IBrandRepository brandRepository) : IRequestHandler<CreateBrandCommand, bool>
    {
        private readonly IBrandRepository _brandRepository = brandRepository;
        public async Task<bool> Handle(CreateBrandCommand request, CancellationToken cancellationToken)
        {
            var brand = new Brand
            {
                Name = request.Brand.Name
            };

            return await _brandRepository.Add(brand);
        }
    }
}
