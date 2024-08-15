import { Component, Inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Product } from '../../../../models/product.model';
import { Category } from '../../../../models/category.model';
import { Brand } from '../../../../models/brand.model';
import { ProductManagementService } from '../../../../services/product-management/product-management.service';
import { ProductDTO } from '../../../../models/productDTO.model';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-update-product-modal',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule],
  templateUrl: './update-product-modal.component.html',
  styleUrl: './update-product-modal.component.css'
})
export class UpdateProductModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Product,
  private ref: MatDialogRef<UpdateProductModalComponent>, private productService : ProductManagementService, private fb: FormBuilder){
    this.getBrands();
    this.getCategories();
  }
  ngOnInit(): void {
      if (this.data.id) {
        this.getProduct(this.data.id);
        console.log(this.product)
      } else {
        console.log("Invalid Id!");
      }
  }

  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    quantity: new FormControl(0, [Validators.required, Validators.min(0)]),
    categoryId: new FormControl(0, Validators.required),
    brandId: new FormControl(0, Validators.required),
    imageURL: new FormControl(''),
    isActive: new FormControl(false)
  });

  convertToProduct(): ProductDTO {
    let product: ProductDTO = {
      imageURL: this.productForm.get('imageURL')?.value ?? "",
      name: this.productForm.get('name')?.value ?? "",
      description: this.productForm.get('description')?.value ?? "",
      price: this.productForm.get('price')?.value ?? 0,
      quantity: this.productForm.get('quantity')?.value ?? 0,
      brandId: this.productForm.get('brandId')?.value ?? 0,
      categoryId: this.productForm.get('categoryId')?.value ?? 0,
      isActive: this.productForm.get('isActive')?.value ?? false
    };
    return product;
  }

  brands?: Brand[];
  categories?: Category[];
  private product?: Product;

  getBrands() {this.productService.getBrands().subscribe((brands) => {
    this.brands = brands;
    });
  }

  getCategories() {this.productService.getCategories().subscribe((categories) => {
    this.categories = categories;
  });
}

  getProduct(id: string) {
    this.productService.getProductById(id).subscribe({
      next: (response) => {
        this.product = response;
        this.productForm.patchValue({
          ...this.product,
          brandId: this.product.brand.id,
          categoryId: this.product.category.id
        });
      },
      error: () => {
        console.log("This product does not exist in the API!");
      }
    });
  }

  checkProduct(id: string): void {
    this.productService.getProductById(id).subscribe({
      error: () => {
        console.log("This product does not exist in the API!");
      }
    });
  }

  updateProduct() {
    let product = this.convertToProduct();

    this.productService.updateProduct(this.data.id, product)
      .subscribe({
        next: () => {
          console.log("Product updated sucessfully!")
          this.close();
        },
        error: () => {
          console.log(`Values provided wasn't accepted by the API!`)
          console.log(this.data.id)
          console.log(product)
        }
      })
  }

  close() {
    this.ref.close();
  }
}
