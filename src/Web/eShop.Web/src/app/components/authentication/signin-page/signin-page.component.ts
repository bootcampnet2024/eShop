import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/authentication/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.css',
})
export class SigninPageComponent {

  name: string = '';
  email: string = '';
  password: string = '';
  cpassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  signin() {
    this.authService.signin(this.name, this.password, this.email).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Erro to register', error);
      }
    );
  }

}
