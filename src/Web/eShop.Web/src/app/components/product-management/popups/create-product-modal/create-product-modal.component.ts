import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Brand } from '../../../../models/brand.model';
import { Category } from '../../../../models/category.model';
import { ProductManagementService } from '../../../../services/product-management/product-management.service';
import {MatGridListModule} from '@angular/material/grid-list';
import { ProductDTO } from '../../../../models/productDTO.model';


@Component({
  selector: 'app-create-product-modal',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatGridListModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-product-modal.component.html',
  styleUrl: './create-product-modal.component.css'
})
export class CreateProductModalComponent implements OnInit{
  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    description: new FormControl(''),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    quantity: new FormControl(0, [Validators.required, Validators.min(0)]),
    categoryId: new FormControl(0, [Validators.required, Validators.min(1)]),
    brandId: new FormControl(0, [Validators.required, Validators.min(1)]),
    imageURL: new FormControl(''),
    isActive: new FormControl(true),
    isHighlighted: new FormControl(false)
  });

  brands?: Brand[];
  categories?: Category[];

  ngOnInit(): void {
    this.getBrands();
    this.getCategories();
  }

  constructor(private ref: MatDialogRef<CreateProductModalComponent>, private productService : ProductManagementService){
    this.getBrands();
    this.getCategories();
  }

  convertToProduct(): ProductDTO {
    let product: ProductDTO = {
      imageURL: this.productForm.get('imageURL')?.value ?? "",
      name: this.productForm.get('name')?.value ?? "",
      description: this.productForm.get('description')?.value ?? "",
      price: this.productForm.get('price')?.value ?? 0,
      quantity: this.productForm.get('quantity')?.value ?? 0,
      brandId: this.productForm.get('brandId')?.value ?? 0,
      categoryId: this.productForm.get('categoryId')?.value ?? 0,
      isActive: this.productForm.get('isActive')?.value ?? false,
      isHighlighted: this.productForm.get('isHighlighted')?.value ?? false
    };
    return product;
  }

  addProduct() : void {
    let product = this.convertToProduct();

    this.productService.addProduct(product).subscribe({
      next: (response) => {
        console.log("Product added successfully!");
      },
      error: (error) => {
        alert(JSON.stringify(error, null, 2));
        console.log(`You provided values that will not be accepted by the API!`);
        console.log(product);
      }
    })
    this.close();
  }

  getBrands() {this.productService.getBrands().subscribe((brands) => {
    this.brands = brands;
    });
  }

  getCategories() {this.productService.getCategories().subscribe((categories) => {
    this.categories = categories;
  });
}

  close() {
    this.ref.close();
  }
}
