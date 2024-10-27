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

  public order: Order = {
    orderId: 0,
    buyerId: "",
    pictureUrl: "",
    date: new Date(),
    address: {
      city: "guariroba",
      street: "general osorio",
      state: "",
      country: "brasil",
      zipCode: "",
    },
    status: "Delivered",
    total: 12399.913,
    items: [
      {
        productId: 0,
        productName: "Cabo sem fio xbox 360",
        unitPrice: 0,
        units: 0,
        discount: 0,
        pictureUrl: "assets/products/xbox-series-controller.jpg",
      },
      {
        productId: 1,
        productName: "Cabo sem fio xbox 360",
        unitPrice: 0,
        discount: 0,
        units: 0,
        pictureUrl: "assets/products/xbox-series-controller.jpg",
      },
    ],
  };

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
        //this.router.navigate([""]);
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
        //this.router.navigate([""]);
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
      { id: item.productId, name: item.productName.trim().replaceAll(" ", "-") },
    ]);
  }
}
