import { Router } from "@angular/router";
import { Product } from "../../../models/product.model";
import { Component, Input, OnInit } from "@angular/core";
import { ProductManagementService } from "../../../services/product-management/product-management.service";

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

  constructor(private router: Router, private productService: ProductManagementService) {}

  ngOnInit(): void {
    this.productService
      .getProducts(
        this.showOnlyHighlighted,
        0,
        this.productQuantity,
        [this.categoryId],
        [],
        0
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
