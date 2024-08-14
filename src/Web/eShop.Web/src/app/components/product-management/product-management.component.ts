import { Brand } from './../../models/brand.model';
import { ProductManagementService } from './../../services/product-management/product-management.service';
import { Product } from './../../models/product.model';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
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

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css'
})
export class ProductManagementComponent implements OnInit{
  constructor(private dialog: MatDialog, private productService : ProductManagementService){
    this.getProducts();
  }

  ngOnInit(): void {
    this.getProducts();
  }

  products?: Product[];

  getProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      console.log(products)
    });
  }

  OpenCreateProductModal() {
    this.dialog.open(CreateProductModalComponent,{
      width: '80%',
      height: '80%',
      maxWidth: '100%',
      maxHeight: '100%'
    });
  }

  OpenUpdateProductModal(ProductId: string) {
    this.dialog.open(UpdateProductModalComponent,{
      data: {
        id: ProductId
      }});
  }
}
