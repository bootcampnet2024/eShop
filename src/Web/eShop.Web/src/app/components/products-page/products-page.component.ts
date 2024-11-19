import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "../../shared/header/header.component";
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { Product } from "../../models/product.model";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { DisplayProductsComponent } from "../home/display-products/display-products.component";
import { Brand } from "../../models/brand.model";
import { ProductManagementService } from "../../services/product-management/product-management.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-products-page",
  standalone: true,
  imports: [
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    DisplayProductsComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: "./products-page.component.html",
  styleUrls: ["./products-page.component.css"],
})
export class ProductsPageComponent implements OnInit {
  public products: Product[] = [];

  maxPage: number = 0;
  brands: Brand[] = [];
  categoryId: number = 0;
  categoryName: string = "Products";
  pageIndex: number = 0;
  brandsIds: number[] = [];
  sortBy: string = "Relevancy";
  sortByTypes: string[] = ["Relevancy", "Lowest Price", "Highest Price"];
  pageSize: number = 50;
  pageSizes: number[] = [10, 20, 30, 40, 50];
  numbers: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductManagementService,
  ) {}

  onSortByChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.sortBy = selectElement.value;
    this.updateUrlParameter("sortBy", this.sortByTypes.indexOf(this.sortBy));
  }

  onPageSizeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.pageSize = Number(selectElement.value);
    this.updateUrlParameter("pageSize", this.pageSize);
  }

  onBrandChange(event: Event, brandId: number) {
    const isChecked = (event.target as HTMLInputElement).checked;
  
    if (isChecked) {
      this.brandsIds.push(brandId);
    } else {
      this.brandsIds = this.brandsIds.filter(id => id !== brandId);
    }
  
    const queryParams = {
      ...this.route.snapshot.queryParams,
      brandIds: this.brandsIds.length ? this.brandsIds : null
    };
  
    this.updateUrlParameterQuery(queryParams);
  }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.categoryId = parseInt(params.get("categoryId") ?? "0");
      this.pageIndex = parseInt(params.get("page") ?? "0");
      this.pageSize = parseInt(params.get("pageSize") ?? "50");
      this.sortBy = this.sortByTypes[parseInt(params.get("sortBy") ?? "0")];
      this.brandsIds = params.getAll("brandIds").map(Number);
      if (!this.pageSizes.includes(this.pageSize)) this.pageSize = 50;
      this.loadBrands();
      this.loadCategory();
      this.loadProducts();
    });
  }

  loadCategory(): void {
    if (this.categoryId == 0) return;
    this.productService.getCategoryById(this.categoryId).subscribe({
      next: (response) => {
        this.categoryName = response.name;
      },
    });
  }

  loadBrands(): void {
    if (this.categoryId != 0) {
      this.productService.getBrandsByCategory(this.categoryId).subscribe({
        next: (response) => {
          this.brands = response;
        },
      });
      return;
    }
    this.productService.getBrands(0, 50).subscribe({
      next: (response) => {
        this.brands = response.items;
      },
    });
  }

  loadProducts(): void {
    this.productService
      .getProducts(false, this.pageIndex, this.pageSize, [this.categoryId], this.brandsIds, this.sortByTypes.indexOf(this.sortBy))
      .subscribe({
        next: (response) => {
          this.products = response.items;
          this.maxPage = Math.ceil(response.totalItems / this.pageSize);
          this.numbers = Array.from({ length: this.maxPage }, (_, i) => i + 1);
        },
      });
  }

  viewProduct(product: Product): void {
    this.router.navigate([
      "/product",
      { id: product.id, name: product.name.trim().replaceAll(" ", "-") },
    ]);
  }

  goToPage(page : number){
    this.pageIndex = page - 1;
    this.updateUrlParameter("page", this.pageIndex);
    this.loadPage();
  }

  goToPreviousPage() {
    if (this.pageIndex == 0) return;
    this.pageIndex--;
    this.updateUrlParameter("page", this.pageIndex);
    this.loadPage();
  }

  goToNextPage() {
    if (this.maxPage - 1 <= this.pageIndex) return;
    this.pageIndex++;
    this.updateUrlParameter("page", this.pageIndex);
    this.loadPage();
  }

  goToFirstPage() {
    this.pageIndex = 0;
    this.updateUrlParameter("page", this.pageIndex);
    this.loadPage();
  }

  goToLastPage() {
    this.pageIndex = this.maxPage - 1;
    this.updateUrlParameter("page", this.pageIndex);
    this.loadPage();
  }

  updateUrlParameter(param: string, value: any): void {
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams: { [param]: value },
        queryParamsHandling: "merge",
      })
      .then(() => {
        this.loadPage();
      });
  }

  updateUrlParameterQuery(queryParams: { [key: string]: any }): void {
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams: queryParams,
        queryParamsHandling: "merge",
      })
      .then(() => {
        this.loadPage();
      });
  }
}
