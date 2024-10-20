import { CommonModule } from '@angular/common';
import { HeaderComponent } from './../../shared/header/header.component';
import { Component, ElementRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ProductManagementService } from '../../services/product-management/product-management.service';
import { CreateBrandModalComponent } from './popups/create-brand-modal/create-brand-modal.component';
import { UpdateBrandModalComponent } from './popups/update-brand-modal/update-brand-modal.component';
import { Brand } from '../../models/brand.model';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-brand-management',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MatButtonModule, MatIconModule, RouterLink, RouterOutlet, RouterLinkActive, CommonModule],
  templateUrl: './brand-management.component.html',
  styleUrl: './brand-management.component.css'
})
export class BrandManagementComponent {
  constructor(
    private dialog: MatDialog,
    private productService: ProductManagementService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getBrands();
  }

  pageIndex: number = 0;
  pageSize: number = 7;
  maxPage: number = 0;
  numbers: number[] = [];

  ngOnInit(): void {
    this.getBrands();
  }

  isEmpty = (text: string): boolean => {
    return text === null || text.match(/^ *$/) !== null;
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
    this.productService.getBrands(this.pageIndex, this.pageSize).subscribe((brands) => {
      this.brands = brands.items;
      this.maxPage = Math.ceil(brands.totalItems / this.pageSize)
      this.numbers = Array.from({ length: this.maxPage }, (_, i) => i + 1);
      if(this.pageIndex < 3) this.numbers = this.numbers.slice(0 , 5);
      else this.numbers = this.numbers.slice(this.pageIndex - 2 , this.pageIndex + 3);
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

  goToProductManagement(){
    this.router.navigate(['/product-management'])
  }

  goToCategoryManagement(){
    this.router.navigate(['/category-management'])
  }
  
  searchBrand = (event: KeyboardEvent): void => {
    const element = event.currentTarget as HTMLInputElement
    const value = element.value

    if (event.key !== 'Enter') return;

    if (this.isEmpty(value)) {
      this.productService.getBrands(this.pageIndex, this.pageSize)
        .subscribe({
          next: (response) => {
            this.brands = response.items
          }
        });
      return;
    }
    this.productService.getBrandsByName(value)
      .subscribe((response) => {
        this.brands = response
      })
  };

  goToPage(page : number){
    this.pageIndex = page - 1;
    this.updateUrlParameter("page", this.pageIndex);
    this.getBrands();
  }

  goToPreviousPage() {
    if (this.pageIndex == 0) return;
    this.pageIndex--;
    this.updateUrlParameter("page", this.pageIndex);
    this.getBrands();
  }

  goToNextPage() {
    if (this.maxPage - 1 <= this.pageIndex) return;
    this.pageIndex++;
    this.updateUrlParameter("page", this.pageIndex);
    this.getBrands();
  }

  goToFirstPage() {
    this.pageIndex = 0;
    this.updateUrlParameter("page", this.pageIndex);
    this.getBrands();
  }

  goToLastPage() {
    this.pageIndex = this.maxPage - 1;
    this.updateUrlParameter("page", this.pageIndex);
    this.getBrands();
  }

  updateUrlParameter(param: string, value: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { [param]: value },
      queryParamsHandling: "merge",
    });
  }

  dateToLocal(dateTime: string){
    let date = new Date(dateTime);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000); 
  }
}
