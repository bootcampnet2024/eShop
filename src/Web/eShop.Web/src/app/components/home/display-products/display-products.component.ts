import { Router } from "@angular/router";
import { Product } from "../../../models/product.model";
import { Component, ElementRef, Input, OnInit } from "@angular/core";
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ProductManagementService } from "../../../services/product-management/product-management.service";

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

  constructor(private router: Router, private productService: ProductManagementService, private el: ElementRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      if (this.products.length != 0) return;
      this.getProducts();
    }, 500);
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
