import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RecoverPasswordModalComponent } from '../popups/recover-password-modal/recover-password-modal.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastService } from 'angular-toastify';

@Component({
  selector: "app-login-page",
  standalone: true,
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"],
  imports: [
    MatSlideToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class LoginPageComponent {
  redirectUrl?: string = localStorage.getItem("redirectUrl") || undefined;
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [""],
      password: [""],
    });
  }

  goToRegister() {
    this.router.navigate(["/signin"]);
  }

  login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: () => {
          const roleBasedRoute = this.authService.getRoleUrl();
          if (!this.redirectUrl) {
            this.router.navigate([roleBasedRoute]);
            return;
          }
          this.router.navigateByUrl(this.redirectUrl);
          localStorage.removeItem("redirectUrl");
        },
        error: (error) => {
          this.toastService.error(error.message);
        },
      });
    }
  }

  openResetPasswordDialog() {
    this.dialog.open(RecoverPasswordModalComponent, {
      width: "300px",
    });
  }
}
