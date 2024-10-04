import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  imports: [FormsModule],
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        const roleBasedRoute = this.authService.getRoleUrl();
        this.router.navigate([roleBasedRoute]);
      },
      error: (error) => {
        console.error('Error to login', error);
      },
    });
  }
}
