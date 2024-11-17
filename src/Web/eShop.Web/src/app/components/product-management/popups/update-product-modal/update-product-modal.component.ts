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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToastService } from 'angular-toastify';
import { ProductRequest } from '../../../../models/product-request.model';

@Component({
  selector: 'app-update-product-modal',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule],
  templateUrl: './update-product-modal.component.html',
  styleUrl: './update-product-modal.component.css'
})
export class UpdateProductModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Product,
  private ref: MatDialogRef<UpdateProductModalComponent>, private productService : ProductManagementService, private _toastService: ToastService){
    this.getBrands();
    this.getCategories();
  }
  ngOnInit(): void {
      if (this.data.id) {
        this.getProduct(this.data.id);
        console.log(this.product)
      } else {
        this.close()
      }
  }

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    discount: new FormControl(0, [Validators.min(0), Validators.max(100)]),
    quantity: new FormControl(0, [Validators.required, Validators.min(0)]),
    category: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
    imageURL: new FormControl(''),
    isActive: new FormControl(false),
    isHighlighted: new FormControl(false)
  });

  brands?: Brand[];
  categories?: Category[];
  private product?: Product;

  
  convertToProduct(): ProductRequest {
    const categoryName = this.productForm.get('category')?.value ?? ""; 
    const brandName = this.productForm.get('brand')?.value ?? ""; 

    const category = this.categories?.find(c => c.name === categoryName);
    if(!category) throw new Error('Category not found');

    const brand = this.brands?.find(b => b.name === brandName);
    if(!brand) throw new Error('Brand not found');

    let product: ProductRequest = {
      imageURL: this.productForm.get('imageURL')?.value ?? "",
      name: this.productForm.get('name')?.value ?? "",
      description: this.productForm.get('description')?.value ?? "",
      price: this.productForm.get('price')?.value ?? 0,
      discount: this.productForm.get('discount')?.value ?? 0,
      quantity: this.productForm.get('quantity')?.value ?? 0,
      categoryId: category.id,
      brandId: brand.id,
      isActive: this.productForm.get('isActive')?.value ?? false,
      isHighlighted: this.productForm.get('isHighlighted')?.value ?? false,
    };
    return product;
  }

  getBrands() {this.productService.getBrands(0, 50).subscribe((brands) => {
    this.brands = brands.items;
    });
  }

  getCategories() {this.productService.getCategories(0, 50).subscribe((categories) => {
    this.categories = categories.items;
  });
}

  getProduct(id: string) {
    this.productService.getProductById(id).subscribe({
      next: (response) => {
        this.product = response;
        this.productForm.patchValue({
          ...this.product,
          brand: this.product.brand,
          category: this.product.category
        });
      },
      error: () => {
        this._toastService.error("This product does not exist in the API!");
      }
    });
  }

  checkProduct(id: string): void {
    this.productService.getProductById(id).subscribe({
      error: () => {
        this._toastService.error("This product does not exist in the API!");
      }
    });
  }

  updateProduct() {
    let product = this.convertToProduct();

    this.productService.updateProduct(this.data.id, product)
      .subscribe({
        next: () => {
          this._toastService.success("Product updated sucessfully!")
        },
        error: () => {
          this._toastService.error(`Values provided wasn't accepted by the API!`)
          console.log(this.data.id)
          console.log(product)
        }
      })
    this.close();
  }

  close() {
    this.ref.close();
  }
}
