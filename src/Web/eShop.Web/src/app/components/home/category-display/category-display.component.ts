import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../../models/category.model';
import { ProductManagementService } from '../../../services/product-management/product-management.service';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-category-display',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './category-display.component.html',
  styleUrl: './category-display.component.css',
})
export class CategoryDisplayComponent implements OnInit{
  @Input() categories: Category[] = [];

  constructor(
    private productManagement: ProductManagementService
  ){}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.productManagement.getCategories(0, 0).subscribe((categories) => {
      this.categories = categories.items;
    })
  }
}
