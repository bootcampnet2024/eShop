import { Product } from './../../models/product.model';
import { ProductService } from './../../services/product-list/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-display',
  standalone: true,
  imports: [],
  templateUrl: './product-display.component.html',
  styleUrl: './product-display.component.css',
})
export class ProductDisplayComponent implements OnInit {

  products? : Product[]

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getCatalogItems()
      .subscribe({
        next : (response) => {
          this.products = response
        }
      })
  }
}
