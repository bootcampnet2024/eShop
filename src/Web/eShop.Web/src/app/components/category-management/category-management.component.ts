import { HeaderComponent } from './../../shared/header/header.component';
import { Category } from './../../models/category.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductManagementService } from '../../services/product-management/product-management.service';
import { CreateCategoryModalComponent } from './popups/create-category-modal/create-category-modal.component';
import { UpdateCategoryModalComponent } from './popups/update-category-modal/update-category-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [HeaderComponent, MatButtonModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './category-management.component.html',
  styleUrl: './category-management.component.css'
})
export class CategoryManagementComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private productService: ProductManagementService,
    private router: Router,
  ) {
    this.getCategories();
  }

  categories?: Category[];

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.productService.getCategories().subscribe((categories) => {
      this.categories = categories;
      console.log(categories);
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
      this.productService.getCategories()
        .subscribe({
          next: (response) => {
            this.categories = response
          }
        });
      return;
    }
    this.productService.getCategoriesByName(value)
      .subscribe((response) => {
        this.categories = response
      })
  };
}
