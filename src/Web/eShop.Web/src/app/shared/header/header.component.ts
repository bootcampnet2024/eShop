import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, RouterOutlet, RouterLink, RouterLinkActive, FormsModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  searchKeyword: string = '';
  isLoggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    this.checkLoginStatus();
  }

  search() {
    if (this.searchKeyword.trim()){
      this.router.navigate(['/search'], { queryParams: {keyword : this.searchKeyword}})
    }
  }

  checkLoginStatus() {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  profile(){
    this.router.navigate([this.authService.getRoleUrl()]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
