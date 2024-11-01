import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Order, OrderItem } from "../../models/order.model";
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { OrderService } from "../../services/order/order.service";
import { UserManagementService } from "../../services/user-management/user-management.service";

@Component({
  selector: "app-order-page",
  standalone: true,
  imports: [FooterComponent, HeaderComponent, NavbarComponent],
  templateUrl: "./order-page.component.html",
  styleUrl: "./order-page.component.css",
})
export class OrderPageComponent implements OnInit {
  orderId: number = 0;
  public prefix = "Your";

  public order?: Order;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private userService: UserManagementService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.orderId = parseInt(params.get("id") ?? "0");
      if (this.orderId == 0) {
        this.router.navigate([""]);
        return;
      }
      this.loadOrder();
    });
  }

  loadOrder(): void {
    this.orderService.getById(this.orderId).subscribe({
      next: (response) => {
        this.order = response;
        this.loadUserData(this.order.buyerId);
      },
      error: () => {
        this.router.navigate([""]);
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

  viewProduct(item: OrderItem): void {
    this.router.navigate([
      "/product",
      {
        id: item.productId,
        name: item.productName.trim().replaceAll(" ", "-"),
      },
    ]);
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
