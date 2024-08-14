import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-update-product-modal',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './update-product-modal.component.html',
  styleUrl: './update-product-modal.component.css'
})
export class UpdateProductModalComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public data: Product,
  private ref: MatDialogRef<UpdateProductModalComponent>){}

  close() {
    this.ref.close();
  }
}
