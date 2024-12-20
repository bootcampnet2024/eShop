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
import { ToastService } from 'angular-toastify';
import { Brand } from '../../../../models/brand.model';

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
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    imageURL: new FormControl('', [Validators.required]),
  });

  constructor(private ref: MatDialogRef<CreateBrandModalComponent>, private productService : ProductManagementService, private _toastService: ToastService){
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

  addBrand() : void {
    let brand = this.convertToBrand();

    this.productService.addBrand(brand).subscribe({
      next: (response) => {
        this._toastService.success("Brand added sucessfully!");
      },
      error: (error) => {
        alert(JSON.stringify(error, null, 2));
        this._toastService.error(`You provided values that will not be accepted by the API!`);
        console.log(brand);
      }
    })
    this.close();
  }

  close() {
    this.ref.close();
  }
}
