using Management.Domain.Repositories;
using MediatR;

namespace Management.API.Operations.Commands.ProductCommands.Handlers
{
    public class DeleteProductCommandHandler(IProductRepository repository) : IRequestHandler<DeleteProductCommand, bool>
    {
        private readonly IProductRepository _productRepository = repository;
        public async Task<bool> Handle(DeleteProductCommand request, CancellationToken cancellation)
        {
            return await _productRepository.Delete(request.id);
        }
    }
}
