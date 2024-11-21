import { Router } from "@angular/router";
import { Product } from "../../../models/product.model";
import { ProductManagementService } from "../../../services/product-management/product-management.service";
import { Component, OnInit, Input } from "@angular/core";
import { TagModule } from "primeng/tag";
import { ButtonModule } from "primeng/button";
import { CarouselModule } from "primeng/carousel";

@Component({
  selector: "app-display-products",
  standalone: true,
  imports: [CarouselModule, TagModule, ButtonModule],
  templateUrl: './display-products.component.html',
  styleUrl: './display-products.component.css',
})
export class DisplayProductsComponent implements OnInit {
  @Input({ required: true }) displayName!: string;
  @Input() showOnlyHighlighted: boolean = false;
  @Input() productQuantity: number = 10;
  @Input() categoryId: number = 0;
  @Input() products: Product[] = [];
  @Input() currentProductId: string = "";

  constructor(private router: Router, private productService: ProductManagementService) {}

  ngOnInit(): void {
    if (this.products.length != 0) return;
    setTimeout(() => {
      this.getProducts();
    }, 100);
  }

  getProducts(): void {
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
          this.products = response.items.filter(
            (i) => i.quantity > 0 && i.isActive
          );
          if (this.currentProductId) {
            this.products = this.products.filter(
              (p) => p.id !== this.currentProductId
            );
          }
        },
      });
  }

  viewProduct(product: Product): void {
    this.router.navigate([
      "/product",
      { id: product.id, name: product.name.trim().replaceAll(" ", "-") },
    ]).then(() => {
      window.location.reload();
    });
  }
}
