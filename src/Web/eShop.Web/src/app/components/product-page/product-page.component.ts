import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { ActivatedRoute, Router } from "@angular/router";
import { DisplayProductsComponent } from "../home/display-products/display-products.component";
import { Product } from "../../models/product.model";
import { ViewportScroller } from "@angular/common";
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { CartService } from "../../services/cart/cart.service";
import { ProductManagementService } from "../../services/product-management/product-management.service";
import { ToastService } from "angular-toastify";

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
    quantity: 0,
    brand: { id: 0, name: "" },
    category: { id: 0, name: "" },
    imageURL: "",
    isActive: false,
    isHighlighted: false,
  };

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
        this.product.quantity = 1;
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

    this.cartService.add(this.userId, this.product).subscribe({
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
