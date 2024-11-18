import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductManagementService } from '../../../../services/product-management/product-management.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { ToastService } from 'angular-toastify';
import { Category } from '../../../../models/category.model';

@Component({
  selector: 'app-create-category-modal',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatGridListModule],
  templateUrl: './create-category-modal.component.html',
  styleUrl: './create-category-modal.component.css'
})
export class CreateCategoryModalComponent{
  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', Validators.maxLength(150)),
    imageURL: new FormControl('')
  });

  constructor(private ref: MatDialogRef<CreateCategoryModalComponent>, private productService : ProductManagementService, private _toastService: ToastService ){}

  convertToCategory(): Category {
    let category: Category = {
      id: 0,
      name: this.categoryForm.get('name')?.value ?? "",
      description: this.categoryForm.get('description')?.value ?? "",
      imageURL: this.categoryForm.get('imageURL')?.value ?? "",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    return category;
  }

  addCategory() : void {
    let category = this.convertToCategory();

    this.productService.addCategory(category).subscribe({
      next: (response) => {
        this._toastService.success("Category added sucessfully!");
      },
      error: (error) => {
        alert(JSON.stringify(error, null, 2));
        this._toastService.error(`You provided values that will not be accepted by the API!`);
        console.log(category);
      }
    })
    this.close();
  }

  close() {
    this.ref.close();
  }
}
