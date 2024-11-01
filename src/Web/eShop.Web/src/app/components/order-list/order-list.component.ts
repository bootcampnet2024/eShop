import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { OrderSummary } from "../../models/orderSummary.model";
import { OrderService } from "../../services/order/order.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { UserManagementService } from "../../services/user-management/user-management.service";

@Component({
  selector: "app-order-list",
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NavbarComponent],
  templateUrl: "./order-list.component.html",
  styleUrl: "./order-list.component.css",
})
export class OrderListComponent implements OnInit {
  public orders: OrderSummary[] = [];

  userId: string = "";

  public prefix: string = "Your";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private userService: UserManagementService
  ) {}

  loadOrders(): void {
    if (this.userId == "") return;
    this.orderService.getAllByUserId(this.userId).subscribe({
      next: (response) => {
        this.orders = response;
        this.loadUserData(this.orders[0].buyerId);
      },
    });
  }

  loadUserData(sub: string): void {
    this.userService.getByCriteria({ id: sub }).subscribe({
      next: (response) => {
        this.prefix = response.fullname.split(" ")[0];
      },
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get("userId") ?? "";
      if (this.userId == "") {
        this.userService.getProfile().subscribe({
          next: (response) => {
            this.userId = response.sub;
            this.loadOrders();
          },
          error: () => {
            this.router.navigate([""]);
          },
        });
        return;
      }
      this.userService.getByCriteria({ id: this.userId }).subscribe({
        next: () => {
          this.loadOrders();
          this.loadUserData(this.userId);
        },
        error: () => {
          this.router.navigate([""]);
          return;
        },
      });
    });
  }

  viewOrder(orderId: number): void {
    this.router.navigate(["/order", { id: orderId }]);
  }

  formatEnum(text: string): string {
    return text[0] + text.slice(1).replace(/([A-Z])/g, ' $1');
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} - ${hours}:${minutes}`;
}
}
