import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProductManagementService } from '../../../../services/product-management/product-management.service';
import { BrandDTO } from '../../../../models/brandDTO.model';

@Component({
  selector: 'app-create-brand-modal',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatGridListModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-brand-modal.component.html',
  styleUrl: './create-brand-modal.component.css'
})
export class CreateBrandModalComponent {
  brandForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
  });

  constructor(private ref: MatDialogRef<CreateBrandModalComponent>, private productService : ProductManagementService){
  }

  convertToBrand(): BrandDTO {
    let brand: BrandDTO = {
      name: this.brandForm.get('name')?.value ?? "",
    };
    return brand;
  }

  addBrand() : void {
    let brand = this.convertToBrand();

    this.productService.addBrand(brand).subscribe({
      next: (response) => {
        console.log("Brand added successfully!");
      },
      error: (error) => {
        alert(JSON.stringify(error, null, 2));
        console.log(`You provided values that will not be accepted by the API!`);
        console.log(brand);
      }
    })
    this.close();
  }

  close() {
    this.ref.close();
  }
}
