import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { ActivatedRoute, Router } from "@angular/router";
import { DisplayProductsComponent } from "../home/display-products/display-products.component";
import { Product } from "../../models/product.model";
import { ViewportScroller } from "@angular/common";
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { CartService } from "../../services/cart/cart.service";
import { ToastService } from "angular-toastify";
import { ProductManagementService } from "../../services/product-management/product-management.service";
import { Category } from "../../models/category.model";
import { CartItemModel } from "../../models/cartItem.model";

@Component({
  selector: "app-product-page",
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    DisplayProductsComponent,
    NavbarComponent,
  ],
  templateUrl: "./product-page.component.html",
  styleUrls: ["./product-page.component.css"],
})
export class ProductPageComponent implements OnInit {
  private productId: string = "";
  public product: Product = {
    id: "",
    name: "",
    description: "",
    price: 0,
    discount: 0,
    finalPrice: 0,
    quantity: 0,
    brand: "",
    category: "",
    imageURL: "",
    isActive: false,
    isHighlighted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  public category?: Category;

  private userId: string | null = null;

  constructor(
    private router: Router,
    private productService: ProductManagementService,
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller,
    private cartService: CartService,
    private toastService: ToastService
  ) {}

  getProduct(id: string): void {
    this.productService.getProductById(id).subscribe({
      next: (response) => {
        this.product = response;
        const categoryName = this.product.category;
        this.getCategoryByName(categoryName);
      },
      error: () => {
        this.router.navigate([""]);
      },
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get("id") || "";
      this.getProduct(this.productId);
      this.viewportScroller.scrollToPosition([0, 0]);
    });
  }

  goToCart() {
    this.router.navigate(["cart"]);
  }

  goToPayment() {
    this.router.navigate(["payment"]);
  }

  getCategoryByName(categoryName?: string): number {
    if (!categoryName) {
      return 0;
    }

    this.productService.getCategoriesByName(categoryName, 0, 50).subscribe({
      next: (response) => {
        if (response && response.items.length > 0) {
          this.category = response.items[0];
          return this.category.id;
        }
        return 0;
      },
    });
    return 0;
  }

  addToCart() {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      console.log(
        "Você precisa estar logado para adicionar itens ao carrinho."
      );
      return;
    }

    this.userId = this.extractUserIdFromToken(accessToken);

    if (!this.userId) {
      console.log("Erro ao identificar o usuário.");
      return;
    }

    const cartItem: CartItemModel = {
      productId: this.product.id,
      quantity: 1,
      price: this.product.price,
      name: this.product.name,
      discount: this.product.discount,
      description: this.product.description,
      imageURL: this.product.imageURL,
      availableQuantity: this.product.quantity,
      userId: this.userId,
    };

    this.cartService.add(this.userId, cartItem).subscribe({
      next: () => {
        this.toastService.success(
          `${this.product.name} foi adicionado ao carrinho!`
        );
      },
      error: (error) => {
        console.error("Erro ao adicionar produto ao carrinho:", error);
        console.log(
          "Houve um erro ao adicionar o produto ao carrinho.",
          error.message || error
        );
        if (error.error) {
          console.error("Resposta da API:", error.error);
        }
      },
    });
  }

  options: any = [
    { name: "Black" },
    { name: "White" },
    { name: "Pink" },
    { name: "Purple" },
    { name: "Green" },
    { name: "Yellow" },
    { name: "Blue" },
    { name: "Camo" },
    { name: "Brown" },
    { name: "Orange" },
    { name: "Grey" },
    { name: "Red" },
  ];

  extractUserIdFromToken(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.sub || payload.jti || null;
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      return null;
    }
  }
}
