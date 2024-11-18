import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { OrderSummary } from "../../models/orderSummary.model";
import { OrderService } from "../../services/order/order.service";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Router } from "@angular/router";
import { UserManagementService } from "../../services/user-management/user-management.service";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-order-list",
  standalone: true,
  imports: [
    NavbarComponent,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    HeaderComponent,
    FooterComponent,
    MatListModule,
    RouterModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: "./order-list.component.html",
  styleUrl: "./order-list.component.css",
})
export class OrderListComponent implements OnInit {
  public orders: OrderSummary[] = [];

  userId?: string; 

  public prefix: string = "Your";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private userService: UserManagementService
  ) {}

  loadOrders(): void {
    if (!this.userId) return;
    this.orderService.getAllByUserId(this.userId).subscribe({
      next: (response) => {
        this.orders = response;
      },
    });
  }

  loadUserData(sub?: string): void {
    if (!sub) return;
    if (this.orders[0].buyerId === sub) return;
    // this.userService.getByCriteria({ id: sub }).subscribe({
    //   next: (response) => {
    //     this.prefix = response.fullname.split(" ")[0];
    //   },
    // });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get("userId") || undefined;
      if (!this.userId) {
        this.userService.getProfile().subscribe({
          next: (response) => {
            this.userId = response.id;
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

  formatEnum(text?: string): string {
    if (!text) return "N/A";
    return text[0] + text.slice(1).replace(/([A-Z])/g, " $1");
  }

  dateToLocal(dateTime: string){
    let date = new Date(dateTime);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000); 
  }
}
