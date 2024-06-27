import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-page',
  standalone: true,
  imports: [],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.css'
})
export class SigninPageComponent {

  constructor(private router: Router) {}
  
  goToLoginPage() {
    this.router.navigate(['/login']);
  }
}
