import { Category } from './../../models/category.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category-filter/category.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

    public categories: Category[] = [];

    constructor(private router: Router, private categoryService : CategoryService ) {}

    ngOnInit(): void {
      this.categoryService.getAll()
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
