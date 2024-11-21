import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "../../../shared/header/header.component";
import { StaticCarouselComponent } from "../static-carousel/static-carousel.component";
import { DisplayProductsComponent } from "../display-products/display-products.component";
import { FooterComponent } from "../../../shared/footer/footer.component";
import { CategoryDisplayComponent } from "../category-display/category-display.component";
import { NavbarComponent } from "../../../shared/navbar/navbar.component";

@Component({
  selector: "app-landing-page",
  standalone: true,
  templateUrl: "./landing-page.component.html",
  styleUrl: "./landing-page.component.css",
  imports: [
    HeaderComponent,
    StaticCarouselComponent,
    DisplayProductsComponent,
    FooterComponent,
    CategoryDisplayComponent,
    NavbarComponent,
  ],
})
export class LandingPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    localStorage.removeItem("redirectUrl");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
