﻿namespace Ordering.API.Application.Models.DTOs;

public record OrderItemDTO
{
    public string ProductId { get; init; }

    public string ProductName { get; init; }

    public decimal UnitPrice { get; init; }

    public decimal Discount { get; init; }

    public int Units { get; init; }

    public string PictureUrl { get; init; }
}