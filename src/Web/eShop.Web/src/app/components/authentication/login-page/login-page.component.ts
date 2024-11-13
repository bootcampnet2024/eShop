import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RecoverPasswordModalComponent } from '../popups/recover-password-modal/recover-password-modal.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  imports: [
    MatSlideToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class LoginPageComponent {
  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        username: [''],
        password: [''],
      },
    );
  }

  login() {
    if (this.loginForm.valid){
      const {username, password} = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: () => {
          const roleBasedRoute = this.authService.getRoleUrl();
          this.router.navigate([roleBasedRoute]);
        },
        error: (error) => {
          window.alert(`Error to login, invalid user and/or password: ${error}`)
          console.error('Error to login', error);
        },
      });
    } else {
      window.alert(`Error to login, invalid form`)
      console.log('Form is invalid');
    }
  }

  openResetPasswordDialog() {
    this.dialog.open(RecoverPasswordModalComponent, {
      width: '300px',
    });
  }
}
