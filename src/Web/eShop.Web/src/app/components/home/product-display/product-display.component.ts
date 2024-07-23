import { Router } from '@angular/router';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product-list/product.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-display',
  standalone: true,
  imports: [],
  templateUrl: './product-display.component.html',
  styleUrl: './product-display.component.css',
})
export class ProductDisplayComponent implements OnInit {

  @Input() category?: string

  products? : Product[]

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getCatalogItems()
      .subscribe({
        next : (response) => {
          this.products = response.items
        }
      })
  }

  viewProduct(product: Product): void {
    this.router.navigate(['/product', { id: product.id, name: product.name.trim().replace(" ", "-") }]);
  }
}
