import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  searchKeyword: string = '';
  constructor(private router: Router) { }

  search() {
    if (this.searchKeyword.trim()){
      this.router.navigate(['/search'], { queryParams: {keyword : this.searchKeyword}})
    }
  }
}
