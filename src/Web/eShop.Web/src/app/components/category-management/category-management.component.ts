import { HeaderComponent } from './../../shared/header/header.component';
import { Category } from './../../models/category.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductManagementService } from '../../services/product-management/product-management.service';
import { CreateCategoryModalComponent } from './popups/create-category-modal/create-category-modal.component';
import { UpdateCategoryModalComponent } from './popups/update-category-modal/update-category-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MatButtonModule, RouterLink, RouterOutlet, RouterLinkActive, CommonModule],
  templateUrl: './category-management.component.html',
  styleUrl: './category-management.component.css'
})
export class CategoryManagementComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private productService: ProductManagementService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getCategories();
  }

  pageIndex: number = 0;
  pageSize: number = 7;
  maxPage: number = 0;
  numbers: number[] = [];
  categories?: Category[];

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.productService.getCategories(this.pageIndex, this.pageSize).subscribe((categories) => {
      this.categories = categories.items;
      this.maxPage = Math.ceil(categories.totalItems / this.pageSize)
      this.numbers = Array.from({ length: this.maxPage }, (_, i) => i + 1);
      if(this.pageIndex < 3) this.numbers = this.numbers.slice(0 , 5);
      else this.numbers = this.numbers.slice(this.pageIndex - 2 , this.pageIndex + 3);
    });
  }

  OpenCreateCategoryModal() {
    const dialogRef = this.dialog.open(CreateCategoryModalComponent, {
      width: '65%',
      height: '40%',
      maxWidth: '100%',
      maxHeight: '100%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getCategories();
    });
  }

  OpenUpdateCategoryModal(categoryId: number) {
    const dialogRef = this.dialog.open(UpdateCategoryModalComponent, {
      data: {
        id: categoryId,
      },
      width: '65%',
      height: '40%',
      maxWidth: '100%',
      maxHeight: '100%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getCategories();
    });
  }

  goToProductManagement(){
    this.router.navigate(['/product-management'])
  }

  goToBrandManagement(){
    this.router.navigate(['/brand-management'])
  }

  isEmpty = (text: string): boolean => {
    return text === null || text.match(/^ *$/) !== null;
  };

  searchCategory = (event: KeyboardEvent): void => {
    const element = event.currentTarget as HTMLInputElement
    const value = element.value

    if (event.key !== 'Enter') return;

    if (this.isEmpty(value)) {
      this.productService.getCategories(this.pageIndex, this.pageSize)
        .subscribe({
          next: (response) => {
            this.categories = response.items
          }
        });
      return;
    }
    this.productService.getCategoriesByName(value)
      .subscribe((response) => {
        this.categories = response
      })
  };

  goToPage(page : number){
    this.pageIndex = page - 1;
    this.updateUrlParameter("page", this.pageIndex);
    this.getCategories();
  }

  goToPreviousPage() {
    if (this.pageIndex == 0) return;
    this.pageIndex--;
    this.updateUrlParameter("page", this.pageIndex);
    this.getCategories();
  }

  goToNextPage() {
    if (this.maxPage - 1 <= this.pageIndex) return;
    this.pageIndex++;
    this.updateUrlParameter("page", this.pageIndex);
    this.getCategories();
  }

  goToFirstPage() {
    this.pageIndex = 0;
    this.updateUrlParameter("page", this.pageIndex);
    this.getCategories();
  }

  goToLastPage() {
    this.pageIndex = this.maxPage - 1;
    this.updateUrlParameter("page", this.pageIndex);
    this.getCategories();
  }

  updateUrlParameter(param: string, value: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { [param]: value },
      queryParamsHandling: "merge",
    });
  }
}
