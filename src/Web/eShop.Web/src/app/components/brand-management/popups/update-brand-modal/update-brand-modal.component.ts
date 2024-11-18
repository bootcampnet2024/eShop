import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpdateProductModalComponent } from '../../../product-management/popups/update-product-modal/update-product-modal.component';
import { Brand } from '../../../../models/brand.model';
import { ProductManagementService } from '../../../../services/product-management/product-management.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-update-brand-modal',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule],
  templateUrl: './update-brand-modal.component.html',
  styleUrl: './update-brand-modal.component.css'
})
export class UpdateBrandModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Brand,
  private ref: MatDialogRef<UpdateProductModalComponent>, private productService : ProductManagementService, private fb: FormBuilder, private _toastService: ToastService){
  }
  ngOnInit(): void {
      if (this.data.id) {
        this.getBrand(this.data.id);
        console.log(this.brand)
      } else {
        this.close()
      }
  }

  brandForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    imageURL: new FormControl('', Validators.required)
  });

  private brand?: Brand;

  getBrand(id: number) {
    this.productService.getBrandById(id).subscribe({
      next: (response) => {
        this.brand = response;
        this.brandForm.patchValue({
          ...this.brand,
        });
      },
      error: () => {
        this._toastService.error("This brand does not exist in the API!");
      }
    });
  }

  checkProduct(id: number): void {
    this.productService.getBrandById(id).subscribe({
      error: () => {
        this._toastService.error("This brand does not exist in the API!");
      }
    });
  }

  convertToBrand(): Brand {
    let brand: Brand = {
      id: 0,
      name: this.brandForm.get('name')?.value ?? "",
      imageURL: this.brandForm.get('imageURL')?.value ?? "",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    return brand;
  }

  updateBrand() {
    let brand = this.convertToBrand();

    this.productService.updateBrand(this.data.id, brand)
      .subscribe({
        next: () => {
          this._toastService.success("Product updated sucessfully!")
        },
        error: () => {
          this._toastService.error(`Values provided wasn't accepted by the API!`)
          console.log(this.data.id)
          console.log(brand)
        }
      })
      this.close();
  }

  close() {
    this.ref.close();
  }
}
