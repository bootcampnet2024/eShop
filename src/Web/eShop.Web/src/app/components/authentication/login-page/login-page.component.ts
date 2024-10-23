import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RecoverPasswordModalComponent } from '../popups/recover-password-modal/recover-password-modal.component';

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

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) {}

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
  openResetPasswordDialog() {
    this.dialog.open(RecoverPasswordModalComponent, {
      width: '300px',
    });
  }
}
