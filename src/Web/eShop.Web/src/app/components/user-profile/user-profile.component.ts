import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { UserManagementService } from '../../services/user-management/user-management.service';
import { AuthService } from '../../core/auth/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'user-profile',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    HeaderComponent,
    FooterComponent,
    MatListModule,
    RouterModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  perfilForm: FormGroup;
  isLoading = true;
  userId: string = '';
  token: string = '';

  constructor(private fb: FormBuilder, private userService: UserManagementService, private authService : AuthService) {
    this.perfilForm = this.fb.group({
      username: ['', Validators.required],
      email: [{ value: '', disabled: true }],
      phoneNumber: [ { value: "", disabled: true }],
      cpf: [{ value: '', disabled: true }],
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.isLoading = true;
    this.userService.getProfile().subscribe({
      next: (data: User) => {
        this.perfilForm.patchValue({
          username: data.username,
          fullname: data.fullname,
          email: data.email,
          cpf: data.cpf,
          phoneNumber: data.phoneNumber,
        });
        this.userId = data.id;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading user data:', error);
        this.isLoading = false;
      }
    });
  }

  updateProfile(): void {
    const date: Date = new Date();
    const formUpdateAt = new Date(this.perfilForm.get('updateAt')?.value); 

    const timeDiff = date.getTime() - formUpdateAt.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);

    if (this.perfilForm.valid && (daysDiff > 7)) {
      this.perfilForm.get('email')?.enable();

      const updatedProfile = {
        username: this.perfilForm.get('username')?.value,
        fullname: this.perfilForm.get('fullname')?.value,
        email: this.perfilForm.get('email')?.value,
        attributes: {
          phoneNumber: this.perfilForm.get('number')?.value,
          cpf: this.perfilForm.get('cpf')?.value,
        }
      };

      this.userService.edit(this.userId, updatedProfile).subscribe({
        next: () => {
          console.log('Profile updated successfully');
          this.authService.getAccessToken();
        },
        error: (error) => {
          console.error('Error updating profile:', error);
        }
      });

      this.perfilForm.get('email')?.disable();
      this.perfilForm.get('cpf')?.disable();
    } else {
      console.warn('Form is invalid');
    }
  }
}
