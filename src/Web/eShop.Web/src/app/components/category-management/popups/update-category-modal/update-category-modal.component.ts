import { CategoryDTO } from './../../../../models/categoryDTO.model';
import { Component, Inject } from '@angular/core';
import { Category } from '../../../../models/category.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductManagementService } from '../../../../services/product-management/product-management.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-update-category-modal',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './update-category-modal.component.html',
  styleUrl: './update-category-modal.component.css'
})
export class UpdateCategoryModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Category,
  private ref: MatDialogRef<UpdateCategoryModalComponent>, private productService : ProductManagementService, private fb: FormBuilder, private _toastService: ToastService){}
  ngOnInit(): void {
      if (this.data.id) {
        this.getCategory(this.data.id);
        console.log(this.category)
      } else {
        this.close()
      }
  }

  categoryForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  convertToCategory(): CategoryDTO {
    let category: CategoryDTO = {
      name: this.categoryForm.get('name')?.value ?? ""
    };
    return category;
  }

  category?: Category;

  getCategory(id: number) {
    this.productService.getCategoryById(id).subscribe({
      next: (response) => {
        this.category = response;
        this.categoryForm.patchValue({
          ...this.category,
        });
      },
      error: () => {
        this._toastService.error("This category does not exist in the API!");
      }
    });
  }

  checkCategory(id: number): void {
    this.productService.getCategoryById(id).subscribe({
      error: () => {
        this._toastService.error("This category does not exist in the API!");
      }
    });
  }

  updateCategory() {
    let category = this.convertToCategory();

    this.productService.updateCategory(this.data.id, category)
      .subscribe({
        next: () => {
          this._toastService.success("Category updated sucessfully!")
        },
        error: () => {
          this._toastService.error(`Values provided wasn't accepted by the API!`)
          console.log(this.data.id)
          console.log(category)
        }
      })
      this.close();
  }

  close() {
    this.ref.close();
  }
}
