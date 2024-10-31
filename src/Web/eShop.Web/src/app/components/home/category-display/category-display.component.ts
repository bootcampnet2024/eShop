import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category.model';
import { ProductManagementService } from '../../../services/product-management/product-management.service';

@Component({
  selector: 'app-category-display',
  standalone: true,
  imports: [],
  templateUrl: './category-display.component.html',
  styleUrl: './category-display.component.css',
})
export class CategoryDisplayComponent implements OnInit{
  constructor(
    private productManagement: ProductManagementService
  ){}

  ngOnInit(): void {
    this.getCategories();
  }

  categories?: Category[];

  getCategories(){
    this.productManagement.getCategories(0, 0).subscribe((categories) => {
      this.categories = categories.items;
    })
  }
}
