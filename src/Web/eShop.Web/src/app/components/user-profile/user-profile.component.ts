import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserProfile } from '../../models/user-profile.model';
import { UserProfileService } from '../../services/user-profile/user-profile.service';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    HeaderComponent,
    FooterComponent,
    MatListModule,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  perfilForm: FormGroup;
  userProfile: UserProfile = {
    id: '1',
    name: '',
    number: '',
    email: '',
    cpf: ''
  };
  isLoading = true;

  constructor(private fb: FormBuilder, private userProfileService: UserProfileService) {
    this.perfilForm = this.fb.group({
      name: ['', Validators.required],
      number: ['', Validators.required],
      email: [{ value: '', disabled: true }],
      cpf: [{ value: '', disabled: true }]
    });
  }

  ngOnInit() {
    this.loadUserData('3fa85f64-5717-4562-b3fc-2c963f66afa6').then(() => {
      this.isLoading = false;
    });
  }

  async loadUserData(userId: string): Promise<void> {
    try {
      const profile = await this.userProfileService.GetUserById(userId).toPromise();
      if (profile) {
        this.userProfile = profile;
        this.perfilForm.patchValue({
          ...this.userProfile
        });
      } else {
        console.error('User profile is undefined');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }

  onSubmit(): void {
    if (this.perfilForm.valid) {
      if (this.userProfile) {
        const updatedProfile: UserProfile = {
          ...this.userProfile,
          ...this.perfilForm.value
        };
        this.userProfileService.UpdateUserProfile(this.userProfile.id, updatedProfile).subscribe(
          response => {
            console.log('Profile updated successfully:', response);
          },
          error => {
            console.error('Error updating profile:', error);
          }
        );
      } else {
        console.error('User profile is undefined');
      }
    }
  }
}
