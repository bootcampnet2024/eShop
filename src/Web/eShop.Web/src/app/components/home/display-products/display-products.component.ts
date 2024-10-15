import { Router } from "@angular/router";
import { Product } from "../../../models/product.model";
import { ProductService } from "../../../services/product-list/product.service";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'app-display-products',
  standalone: true,
  imports: [],
  templateUrl: './display-products.component.html',
  styleUrl: './display-products.component.css',
})
export class DisplayProductsComponent implements OnInit {
  @Input() showOnlyHighlighted: boolean = false;
  @Input() productQuantity: number = 10;
  @Input() categoryId: number = 0;

  products: Product[] = [];

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.productService
      .getCatalogItems(
        this.showOnlyHighlighted,
        0,
        this.productQuantity,
        this.categoryId
      )
      .subscribe({
        next: (response) => {
          this.products = response.items;
        },
      });
  }

  viewProduct(product: Product): void {
    this.router.navigate([
      "/product",
      { id: product.id, name: product.name.trim().replaceAll(" ", "-") },
    ]);
  }
}
