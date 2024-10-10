import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpdateProductModalComponent } from '../../../product-management/popups/update-product-modal/update-product-modal.component';
import { Brand } from '../../../../models/brand.model';
import { ProductManagementService } from '../../../../services/product-management/product-management.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrandDTO } from '../../../../models/brandDTO.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-update-brand-modal',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule],
  templateUrl: './update-brand-modal.component.html',
  styleUrl: './update-brand-modal.component.css'
})
export class UpdateBrandModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Brand,
  private ref: MatDialogRef<UpdateProductModalComponent>, private productService : ProductManagementService, private fb: FormBuilder){
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
    name: new FormControl('', Validators.required),
  });

  convertToBrand(): BrandDTO {
    let brand: BrandDTO = {
      name: this.brandForm.get('name')?.value ?? "",
    };
    return brand;
  }

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
        console.log("This brand does not exist in the API!");
      }
    });
  }

  checkProduct(id: number): void {
    this.productService.getBrandById(id).subscribe({
      error: () => {
        console.log("This brand does not exist in the API!");
      }
    });
  }

  updateBrand() {
    let brand = this.convertToBrand();

    this.productService.updateBrand(this.data.id, brand)
      .subscribe({
        next: () => {
          console.log("Product updated sucessfully!")
          this.close();
        },
        error: () => {
          console.log(`Values provided wasn't accepted by the API!`)
          console.log(this.data.id)
          console.log(brand)
        }
      })
  }

  close() {
    this.ref.close();
  }
}
