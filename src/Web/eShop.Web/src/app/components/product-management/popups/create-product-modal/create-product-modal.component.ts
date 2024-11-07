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
import { ToastService } from 'angular-toastify';
import { Product } from '../../../../models/product.model';


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

  ngOnInit(): void {
    this.getBrands();
    this.getCategories();
  }

  constructor(private ref: MatDialogRef<CreateProductModalComponent>, private productService : ProductManagementService, private _toastService: ToastService){
    this.getBrands();
    this.getCategories();
  }

  convertToProduct(): Product {
    let product: Product = {
      id: "",
      imageURL: this.productForm.get('imageURL')?.value ?? "",
      name: this.productForm.get('name')?.value ?? "",
      description: this.productForm.get('description')?.value ?? "",
      price: this.productForm.get('price')?.value ?? 0,
      discount: this.productForm.get('discount')?.value ?? 0,
      finalPrice: 0,
      quantity: this.productForm.get('quantity')?.value ?? 0,
      brand: this.productForm.get('brand')?.value ?? "",
      category: this.productForm.get('category')?.value ?? "",
      isActive: this.productForm.get('isActive')?.value ?? false,
      isHighlighted: this.productForm.get('isHighlighted')?.value ?? false,
      createdAt: new Date(),
      updatedAt: new Date(), 
    };
    return product;
  }

  addProduct() : void {
    let product = this.convertToProduct();

    this.productService.addProduct(product).subscribe({
      next: () => {
        this._toastService.success("Product added sucessfully!");
        this.close();
      },
      error: () => {
        this._toastService.error(`You provided values that will not be accepted by the API!`);
      }
    })
  }

  getBrands() {this.productService.getBrands(0, 50).subscribe((brands) => {
    this.brands = brands.items;
    });
  }

  getCategories() {this.productService.getCategories(0, 50).subscribe((categories) => {
    this.categories = categories.items;
  });
}

  close() {
    this.ref.close();
  }
}
