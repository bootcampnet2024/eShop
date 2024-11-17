import { OrderItemRequest } from "./../../models/order.request";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { PaymentService } from "../../services/payment/payment.service";
import { UserManagementService } from "../../services/user-management/user-management.service";
import { CartService } from "../../services/cart/cart.service";
import { CartItemModel } from "../../models/cartItem.model";
import { User } from "../../models/user.model";
import { Address } from "../../models/address";
import { Item } from "../../models/item ";
import { OrderService } from "../../services/order/order.service";
import { OrderRequest } from "../../models/order.request";
import { Router } from "@angular/router";

@Component({
  selector: "app-payment-page",
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FontAwesomeModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: "./payment-page.component.html",
  styleUrls: ["./payment-page.component.css"],
})
export class PaymentPageComponent implements OnInit {
  items: CartItemModel[] = [];
  paymentForm: FormGroup;
  totalAmount: number = 0;
  userId: string | null = null;
  message: string = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private paymentService: PaymentService,
    private UserManagementService: UserManagementService,
    private orderService: OrderService,
    private cartService: CartService
  ) {
    this.paymentForm = this.fb.group({
      paymentMethod: ["", Validators.required],
      cardNumber: ["", Validators.required],
      cardOwner: ["", Validators.required],
      expirationMonth: ["", Validators.required],
      expirationYear: ["", Validators.required],
      cvv: ["", [Validators.required, Validators.pattern("^[0-9]{3,4}$")]],
      couponCode: [""],
      postalCode: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      this.userId = storedUserId;
      this.loadUserProfile();
    } else {
      console.error("User ID not found.");
    }
  }

  loadUserProfile(): void {
    this.UserManagementService.getProfile().subscribe({
      next: (user: User) => {
        console.log(user);
        this.loadCartItems();
      },
      error: (err: any) => {
        console.error("Erro ao obter dados do perfil do usuário:", err);
      },
    });
  }

  loadCartItems(): void {
    if (!this.userId) {
      console.error("User ID is undefined or null in loadCartItems.");
      return;
    }

    this.cartService.getItems(this.userId).subscribe({
      next: (items) => {
        console.log("Itens do carrinho carregados:", items);
        this.items = items;
        this.totalAmount = this.calculateTotalAmount();
      },
      error: (error) => {
        console.error("Erro ao carregar itens do carrinho:", error);
      },
    });
  }

  calculateTotalAmount(): number {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  createOrderRequest(): void {
    const convertedOrderItems: OrderItemRequest[] = this.items.map((item) => ({
      productId: item.productId,
      productName: item.name,
      unitPrice: item.price,
      oldUnitPrice: item.price,
      quantity: item.quantity,
      pictureUrl: item.imageURL,
    }));

    const request: OrderRequest = {
      city: "São Paulo",
      street: "Rua Exemplo",
      state: "SP",
      country: "Brasil",
      zipCode: "12345-678",
      items: convertedOrderItems,
      cardNumber: this.paymentForm.value.cardNumber,
      cardHolderName: this.paymentForm.value.cardOwner,
      cardExpiration: `${
        this.paymentForm.value.expirationYear
      }-${this.paymentForm.value.expirationMonth.padStart(2, "0")}-01`,
      cardSecurityNumber: this.paymentForm.value.cvv,
      cardTypeId: 1,
    };

    console.log("Ordem a ser criada:", request);

    this.orderService.createOrder(request).subscribe({
      next: (response) => {
        console.log("Ordem criada:", response);
        this.message = "Ordem criada com sucesso!";
        for (const item of this.items) {
          this.cartService.remove(this.userId!, item.productId).subscribe({
            next: () => {
              console.log("Item removido do carrinho:", item.productId);
            },
            error: (error) => {
              console.error("Erro ao remover item do carrinho:", error);
            },
          });
        }
        this.router.navigate(["/order", { id: response.orderId }]);
      },
      error: (error) => {
        console.error("Erro ao criar ordem:", error);
        this.message = "Falha ao criar ordem. Tente novamente.";
      },
    });
  }

  completeOrder(): void {
    this.UserManagementService.getProfile().subscribe({
      next: (user: User) => {
        const customerData = this.buildCustomerData(user);
        this.processPayment(customerData);
      },
      error: (err: any) => {
        console.error("Erro ao obter dados do perfil do usuário:", err);
        this.message = "Falha ao obter dados do usuário. Tente novamente.";
      },
    });
  }

  buildCustomerData(user: User): {
    name: string;
    email: string;
    phoneNumber: string;
    cpf: string;
    paymentMethod: string;
    address: Address;
    items: Item[];
  } {
    return {
      name: user.attributes?.full_name[0] || "",
      email: user.email,
      phoneNumber: user.attributes?.phone_number?.[0] ?? "",
      cpf: user.attributes?.cpf?.[0] ?? "",
      paymentMethod: this.paymentForm.value.paymentMethod,
      address: {
        street: "Rua Exemplo",
        number: 123,
        city: "Cidade Exemplo",
        state: "Estado Exemplo",
        country: "Brasil",
        zipCode: this.paymentForm.value.postalCode,
      },
      items: this.items.map((item) => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
    };
  }

  processPayment(customerData: any): void {
    this.paymentService.processPayment(customerData).subscribe({
      next: (response) => {
        console.log("API response:", response);
        this.message = "Compra realizada com sucesso!";
        this.createOrderRequest();
      },
      error: (error) => {
        console.error("API error:", error);
        this.message = "Falha na compra. Por favor, tente novamente.";
      },
    });
  }
}
