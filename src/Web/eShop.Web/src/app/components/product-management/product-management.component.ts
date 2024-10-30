import { ProductManagementService } from './../../services/product-management/product-management.service';
import { Product } from './../../models/product.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductModalComponent } from './popups/create-product-modal/create-product-modal.component';
import { UpdateProductModalComponent } from './popups/update-product-modal/update-product-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { ToastService } from 'angular-toastify';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MatButtonModule, MatIconModule, RouterLink, RouterOutlet, RouterLinkActive, CommonModule],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css',
})
export class ProductManagementComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private productService: ProductManagementService,
    private _toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getProducts();
  }

  pageIndex: number = 0;
  sortBy: string = "Relevancy";
  sortByTypes: string[] = ["Relevancy", "Lowest Price", "Highest Price"];
  pageSize: number = 7;
  maxPage: number = 0;
  numbers: number[] = Array.from({ length: this.maxPage }, (_, i) => i + 1);

  @ViewChild('searchInput', { static: true }) searchInputElementRef!: ElementRef;
  searchInputElement!: HTMLInputElement;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.pageIndex = parseInt(params.get("page") ?? "0");
      this.pageSize = parseInt(params.get("pageSize") ?? "7");
      this.getProducts();
    });
  }

  isEmpty = (text: string): boolean => {
    return text === null || text.match(/^ *$/) !== null;
  };

  searchProduct = (event: KeyboardEvent): void => {
    const element = event.currentTarget as HTMLInputElement
    const value = element.value

    if (event.key !== 'Enter') return;

    if (this.isEmpty(value)) {
      this.productService.getProducts(false, this.pageIndex, this.pageSize, [], [], 0)
        .subscribe({
          next: (response) => {
            this.products = response.items
          }
        });
      return;
    }
    this.productService.getProductsByName(value)
      .subscribe((response) => {
        this.products = response
      })
  };

  products?: Product[];

  disableProduct(productId: string) {
    this.productService.disableProduct(productId).subscribe({
      next: () => {
        this._toastService.success(
          `Product with ID ${productId} has been successfully disabled.`
        );
        this.getProducts();
      },
      error: () => {
        this._toastService.error(`Failed to disable product with ID ${productId}.`);
      },
    });
  }

  getProducts() {
    this.productService.getProducts(false, this.pageIndex, this.pageSize, [], [], 0).subscribe((products) => {
      this.products = products.items;
      console.log(products);
      this.maxPage = Math.ceil(products.totalItems / this.pageSize)
      this.numbers = Array.from({ length: this.maxPage }, (_, i) => i + 1);
    });
  }

  OpenCreateProductModal() {
    const dialogRef = this.dialog.open(CreateProductModalComponent, {
      width: '65%',
      height: '65%',
      maxWidth: '100%',
      maxHeight: '100%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getProducts();
    });
  }

  OpenUpdateProductModal(productId: string) {
    const dialogRef = this.dialog.open(UpdateProductModalComponent, {
      data: {
        id: productId,
      },
      width: '65%',
      height: '65%',
      maxWidth: '100%',
      maxHeight: '100%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getProducts();
    });
  }

  goToBrandManagement() {
    this.router.navigate(['/brand-management'])
  }

  goToCategoryManagement() {
    this.router.navigate(['/category-management'])
  }

  goToPage(page : number){
    this.pageIndex = page - 1;
    this.updateUrlParameter("page", page);
    this.getProducts();
  }

  goToPreviousPage() {
    if (this.pageIndex == 0) return;
    this.pageIndex--;
    this.updateUrlParameter("page", this.pageIndex);
    this.getProducts();
  }

  goToNextPage() {
    if (this.maxPage - 1 <= this.pageIndex) return;
    this.pageIndex++;
    this.updateUrlParameter("page", this.pageIndex);
    this.getProducts();
  }

  updateUrlParameter(param: string, value: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { [param]: value },
      queryParamsHandling: "merge",
    });
  }
}
