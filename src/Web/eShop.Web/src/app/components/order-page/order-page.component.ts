import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Order, OrderItem } from "../../models/order.model";
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { OrderService } from "../../services/order/order.service";
import { UserManagementService } from "../../services/user-management/user-management.service";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";

@Component({
  selector: "app-order-page",
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    MatListModule,
    RouterModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
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
        console.log(response);
        this.order = response;
        this.loadUserData(this.order.buyerId);
      },
      error: () => {
        this.router.navigate([""]);
      },
    });
  }

  loadUserData(sub: string): void {
    if (this.order?.buyerId === sub) return;
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

  formatEnum(text?: string): string {
    if (!text) return "N/A";
    return text[0] + text.slice(1).replace(/([A-Z])/g, " $1");
  }

  formatDate(dateString?: string): string {
    if (!dateString) return "N/A";
    
    let date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  }
}
