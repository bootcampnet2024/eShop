import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "../../shared/header/header.component";
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { Product } from "../../models/product.model";
import { ProductService } from "../../services/product-list/product.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { ViewportScroller } from "@angular/common";
import { DisplayProductsComponent } from "../home/display-products/display-products.component";
import { CategoryService } from "../../services/category-service/category.service";
import { Brand } from "../../models/brand.model";

@Component({
  selector: "app-category-page",
  standalone: true,
  imports: [
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    DisplayProductsComponent,
  ],
  templateUrl: "./category-page.component.html",
  styleUrls: ["./category-page.component.css"],
})
export class CategoryPageComponent implements OnInit {
  public products: Product[] = [];

  maxPage: number = 0;
  brands: Brand[] = [
    {
      id: 1,
      name: "Brand 1",
    },
    {
      id: 3,
      name: "Brand 2",
    },
    {
      id: 3,
      name: "Brand 3",
    },
  ];
  categoryId: number = 0;
  categoryName: string = "Products";
  pageIndex: number = 0;
  sortBy: string = "Relevancy";
  sortByTypes: string[] = ["Relevancy", "Lowest Price", "Highest Price"];
  pageSize: number = 50;
  pageSizes: number[] = [10, 20, 30, 40, 50];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private viewportScroller: ViewportScroller
  ) {}

  onSortByChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.sortBy = selectElement.value;
  }

  onPageSizeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.pageSize = Number(selectElement.value);
    this.updateUrlParameter("pageSize", this.pageSize);
    this.loadItems();
  }

  loadItems(): void {
    if (this.categoryId != 0) {
      this.categoryService.getById(this.categoryId).subscribe({
        next: (response) => {
          this.categoryName = response.name;
        },
      });
    }
    this.productService
      .getCatalogItems(false, this.pageIndex, this.pageSize, this.categoryId)
      .subscribe({
        next: (response) => {
          this.maxPage = response.count / this.pageSize;
          this.products = response.items;
        },
      });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.categoryId = parseInt(params.get("id") ?? "0");
      this.pageIndex = parseInt(params.get("page") ?? "0");
      this.pageSize = parseInt(params.get("pageSize") ?? "50");
      if (!this.pageSizes.includes(this.pageSize)) this.pageSize = 50;
      this.loadItems();
      this.viewportScroller.scrollToPosition([0, 0]);
    });
  }

  viewProduct(product: Product): void {
    this.router.navigate([
      "/product",
      { id: product.id, name: product.name.trim().replaceAll(" ", "-") },
    ]);
  }

  goToPreviousPage() {
    if (this.pageIndex == 0) return;
    this.pageIndex--;
    this.updateUrlParameter("page", this.pageIndex);
    this.loadItems();
  }

  goToNextPage() {
    if (this.maxPage >= this.pageIndex) return;
    this.pageIndex++;
    this.updateUrlParameter("page", this.pageIndex);
    this.loadItems();
  }

  updateUrlParameter(param: string, value: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { [param]: value },
      queryParamsHandling: "merge",
    });
  }
}
