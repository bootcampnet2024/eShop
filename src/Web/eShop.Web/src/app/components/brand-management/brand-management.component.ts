import { Component, ElementRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ProductManagementService } from '../../services/product-management/product-management.service';
import { CreateBrandModalComponent } from './popups/create-brand-modal/create-brand-modal.component';
import { UpdateBrandModalComponent } from './popups/update-brand-modal/update-brand-modal.component';
import { Brand } from '../../models/brand.model';

@Component({
  selector: 'app-brand-management',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './brand-management.component.html',
  styleUrl: './brand-management.component.css'
})
export class BrandManagementComponent {
  constructor(
    private dialog: MatDialog,
    private productService: ProductManagementService
  ) {
    this.getBrands();
  }

  // @ViewChild('searchInput', { static: true }) searchInputElementRef!: ElementRef;
  // searchInputElement!: HTMLInputElement;

  ngOnInit(): void {
    this.getBrands();
  }

  isEmpty = (text: string): boolean => {
    return text === null || text.match(/^ *$/) !== null;
  };

  searchBrand = (event: KeyboardEvent): void => {
    const element = event.currentTarget as HTMLInputElement
    const value = element.value

    if (event.key !== 'Enter') return;

    if (this.isEmpty(value)) {
      this.productService.getBrands()
        .subscribe({
          next: (response) => {
            this.brands = response
          }
        });
      return;
    }
    // this.productService.getProductsByName(value)
    //   .subscribe((response) => {
    //     this.brands = response
    //   })
  };

  brands?: Brand[];

  // disableBrand(brandId: number) {
  //   this.productService.disableBrand(brandId).subscribe({
  //     next: () => {
  //       console.log(
  //         `Product with ID ${brandId} has been successfully disabled.`
  //       );
  //       this.getBrands();
  //     },
  //     error: (error) => {
  //       console.error(`Failed to disable product with ID ${brandId}.`, error);
  //       alert(
  //         'An error occurred while trying to disable the brand. Please try again.'
  //       );
  //     },
  //   });
  // }

  getBrands() {
    this.productService.getBrands().subscribe((brands) => {
      this.brands = brands;
      console.log(brands);
    });
  }

  OpenCreateBrandModal() {
    const dialogRef = this.dialog.open(CreateBrandModalComponent, {
      width: '65%',
      height: '40%',
      maxWidth: '100%',
      maxHeight: '100%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getBrands();
    });
  }

  OpenUpdateBrandModal(brandId: number) {
    const dialogRef = this.dialog.open(UpdateBrandModalComponent, {
      data: {
        id: brandId,
      },
      width: '65%',
      height: '40%',
      maxWidth: '100%',
      maxHeight: '100%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getBrands();
    });
  }
}
