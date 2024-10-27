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
  public orders: OrderSummary[] = [
    {
      pictureUrl: "assets/products/xbox-series-controller.jpg",
      orderId: 0,
      date: "23/10/2024",
      status: "En route",
      total: 250,
    },

    {
      pictureUrl: "assets/products/xbox-series-controller.jpg",
      orderId: 1,
      date: "26/10/2024",
      status: "Delivered",
      total: 100,
    },
  ];

  userId: string = "";

  public prefix: string = "Your";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private userService: UserManagementService
  ) {}

  loadItems(): void {
    this.orderService.getByUserId(this.userId).subscribe({
      next: (response) => {
        this.orders = response;
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
            this.loadItems();
          },
          error: () => {
            //this.router.navigate([""]);
          },
        });
      }
      this.loadItems();
    });
  }

  viewOrder(orderId: number): void {
    this.router.navigate(["/order", { id: orderId }]);
  }
}
