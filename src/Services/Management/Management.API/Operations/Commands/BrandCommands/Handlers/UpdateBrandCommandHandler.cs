using Management.API.Operations.Commands.CategoryCommands;
using Management.Domain.Repositories;
using Management.Infrastructure.Repositories;
using MediatR;

namespace Management.API.Operations.Commands.BrandCommands.Handlers
{
    public class UpdateBrandCommandHandler(IBrandRepository brandRepository) : IRequestHandler<UpdateBrandCommand, bool>
    {
        private readonly IBrandRepository _brandRepository = brandRepository;

        public async Task<bool> Handle(UpdateBrandCommand request, CancellationToken cancellationToken)
        {
            var brand = await _brandRepository.GetById(request.Id);

            if (brand == null) return false;

            brand.Name = request.Category.Name;

            return await _brandRepository.Update(request.Id, brand);
        }
    }
}
