import { Category } from './../../models/category.model';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category-filter/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

    categories? : Category[]

    constructor(private router: Router, private route: ActivatedRoute, private categoryService : CategoryService ) {}

    ngOnInit(): void {
      this.categoryService.getCatalogCategories()
        .subscribe({
          next : (response) => {
            this.categories = response
          }
        })
    }

    goToCategoryPage(categoryId: number) : void
    {
      this.router.navigate(['/category', {id: categoryId}])
    }
}
