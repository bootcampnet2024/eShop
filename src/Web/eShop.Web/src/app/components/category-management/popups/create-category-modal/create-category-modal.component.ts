import { Component } from '@angular/core';
import { CategoryDTO } from '../../../../models/categoryDTO.model';
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

@Component({
  selector: 'app-create-category-modal',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatGridListModule],
  templateUrl: './create-category-modal.component.html',
  styleUrl: './create-category-modal.component.css'
})
export class CreateCategoryModalComponent{
  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
  });

  constructor(private ref: MatDialogRef<CreateCategoryModalComponent>, private productService : ProductManagementService, private _toastService: ToastService ){}

  convertToCategory(): CategoryDTO {
    let category: CategoryDTO = {
      name: this.categoryForm.get('name')?.value ?? ""
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
