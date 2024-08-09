import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css'
})
export class ProductManagementComponent {
  products = [
    { id: 2, name: 'Product 2', price: 200, description: 'Description 2', quantity: 20, category: 'Category 2', imageUrl: 'https://via.placeholder.com/150' },
    { id: 1, name: 'Product 1', price: 100, description: 'Description 1', quantity: 10, category: 'Category 1', imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', price: 300, description: 'Description 3', quantity: 30, category: 'Category 3', imageUrl: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Product 4', price: 400, description: 'Description 4', quantity: 40, category: 'Category 4', imageUrl: 'https://via.placeholder.com/150' },
  ]
}
