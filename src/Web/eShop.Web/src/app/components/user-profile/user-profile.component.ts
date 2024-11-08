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
  updateAt: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private userService: UserManagementService,
    private authService: AuthService
  ) {
    this.perfilForm = this.fb.group({
      username: ['', Validators.required],
      email: [''],
      phoneNumber: [''],
      cpf: [''],
      fullname: [''],
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
          fullname: data.attributes?.full_name ? data.attributes.full_name[0] : '',
          email: data.email,
          cpf: data.attributes?.cpf ? data.attributes.cpf[0] : '',
          phoneNumber: data.attributes?.phone_number ? data.attributes.phone_number[0] : '', 
        });
        this.userId = data.id;
        this.isLoading = false;
        this.updateAt = data.attributes?.update_at ? new Date(data.attributes.update_at[0]) : new Date();
        console.log('User data loaded:', data);
      },
      error: (error) => {
        console.error('Error loading user data:', error);
        this.isLoading = false;
      }
    });
  }
  

  updateProfile(): void {
    const date: Date = new Date();
    const timeDiff = date.getTime() - this.updateAt.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
  
    if (this.perfilForm.valid && daysDiff > 0) {
      const body = {
        username: this.perfilForm.get('username')?.value,
        enabled: true,
        emailVerified: true,
        email: this.perfilForm.get('email')?.value,
        attributes: {
          full_name: [this.perfilForm.get('fullname')?.value], 
          cpf: [this.perfilForm.get('cpf')?.value], 
          phone_number: [this.perfilForm.get('phoneNumber')?.value], 
          update_at: [date.toISOString()], 
        },
      };
      this.userService.edit(this.userId, body).subscribe({
        next: () => {
          console.log('Profile updated successfully');
          this.authService.getAccessToken();
        },
        error: (error) => {
          console.error('Error updating profile:', error);
        }
      });
    } else {
      console.warn('Form is invalid or update time is not valid');
    }
  }  
}
