﻿using Management.Domain.Models;
using MediatR;

namespace Management.API.Operations.Queries.BrandQueries
{
    public record GetBrandsByIdQuery(int id) : IRequest<Brand>;
}
