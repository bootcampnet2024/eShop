import { Brand } from './../../models/brand.model';
import { ProductManagementService } from './../../services/product-management/product-management.service';
import { Product } from './../../models/product.model';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CreateProductModalComponent } from './popups/create-product-modal/create-product-modal.component';
import { UpdateProductModalComponent } from './popups/update-product-modal/update-product-modal.component';
import { ProductService } from '../../services/product-list/product.service';
import { Category } from '../../models/category.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css',
})
export class ProductManagementComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private productService: ProductManagementService
  ) {
    this.getProducts();
  }

  ngOnInit(): void {
    this.getProducts();
  }

  products?: Product[];

  disableProduct(productId: string) {
    this.productService.disableProduct(productId).subscribe({
      next: () => {
        console.log(
          `Product with ID ${productId} has been successfully disabled.`
        );
        this.getProducts();
      },
      error: (error) => {
        console.error(`Failed to disable product with ID ${productId}.`, error);
        alert(
          'An error occurred while trying to disable the product. Please try again.'
        );
      },
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      console.log(products);
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
}
