import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { ActivatedRoute, Router } from "@angular/router";
import { DisplayProductsComponent } from "../home/display-products/display-products.component";
import { Product } from "../../models/product.model";
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { CartService } from "../../services/cart/cart.service";
import { ToastService } from "angular-toastify";
import { ProductManagementService } from "../../services/product-management/product-management.service";
import { CartItemModel } from "../../models/cartItem.model";
import { firstValueFrom } from "rxjs";
import { AuthService } from '../../core/auth/auth.service';

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

  public categoryId: number = 0;
  private userId: string | null = null;

  constructor(
    private router: Router,
    private productService: ProductManagementService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private cartService: CartService,
    private toastService: ToastService
  ) {}

  getProduct(id: string): void {
    this.productService.getProductById(id).subscribe({
      next: async (response) => {
        this.product = response;
        if (!this.product.isActive && !this.authService.getRoles().includes('admin')) {
          this.router.navigate([""]);
        }
        this.categoryId = await this.getCategoryByName(this.product.category);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
    });
  }

  goToCart() {
    this.addToCart();
  }

  goToPayment() {
    this.router.navigate(["payment"]);
  }

  async getCategoryByName(categoryName?: string): Promise<number> {
    if (!categoryName) {
      return 0;
    }
  
    try {
      const response = await firstValueFrom(this.productService.getCategoriesByName(categoryName, 50, 0));
  
      console.log(response);
      if (response && response.items.length > 0) {
        return response.items[0].id;
      }
      return 0;
    } catch (error) {
      console.error("Erro ao buscar a categoria:", error);
      return 0;
    }
  }

  addToCart(redirect: boolean = false): void {
    const accessToken = localStorage.getItem("access_token") ?? undefined;
    this.userId = this.extractUserIdFromToken(accessToken);

    if (!accessToken) {
      console.log(
        "Você precisa estar logado para adicionar itens ao carrinho."
      );
    }

    if (!this.userId) {
      console.log("Erro ao identificar o usuário.");
      const redirectUrl = this.route.snapshot.url
        .map((segment) => {
          const path = segment.path;
          const params = Object.entries(segment.parameters || {})
            .map(([key, value]) => `${key}=${value}`)
            .join(";");
          return params ? `${path};${params}` : path;
        })
        .join("/");
      localStorage.setItem('redirectUrl', redirectUrl);
      console.log(redirectUrl);
      this.router.navigate(["login"]);
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
        if (redirect) {
          this.router.navigate(["cart"]);
        }
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

  extractUserIdFromToken(token?: string): string | null {
    try {
      if (!token) 
        return null;
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.sub || payload.jti || null;
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      return null;
    }
  }
}
