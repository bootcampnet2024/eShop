import { Router } from '@angular/router';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product-list/product.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-highlighted-product',
  standalone: true,
  imports: [],
  templateUrl: './display-highlighted-product.component.html',
  styleUrl: './display-highlighted-product.component.css',
})
export class DisplayHighlightedProductComponent implements OnInit {

  @Input() category?: string

  products?: Product[]

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getCatalogItems(true, 0, 10)
      .subscribe({
        next: (response) => {
          this.products = response.items
        }
      }
      ),
      this.products = [{
        "id": "teste",
        "name": "teste",
        "description": "teste",
        "price": 1924.00,
        "brand": "teste",
        "category": "teste"
      }
      ]
  }

  viewProduct(product: Product): void {
    this.router.navigate(['/product', { id: product.id, name: product.name.trim().replace(" ", "-") }]);
  }
}
