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

  

  constructor(private authService: AuthService, private router: Router) {}

  signin() {

  }

}
