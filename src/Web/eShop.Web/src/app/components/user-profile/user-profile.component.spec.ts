import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileService } from '../../services/user-profile/user-profile.service';
import { UserProfile } from '../../models/user-profile.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { of, throwError } from 'rxjs';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let userProfileService: UserProfileService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        HeaderComponent,
        FooterComponent,
        RouterModule,
        MatIconModule
      ],
      declarations: [UserProfileComponent],
      providers: [UserProfileService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    userProfileService = TestBed.inject(UserProfileService);
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load user data on init', async () => {
      // Arrange
      const mockUserProfile: UserProfile = {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', // Use a GUID here
        name: 'John Doe',
        number: '123456789',
        email: 'john.doe@example.com',
        dateOfBirth: new Date('1990-01-01'), // Use a Date object here
        cpf: '12345678900'
      };

      spyOn(userProfileService, 'GetUserById').and.returnValue(of(mockUserProfile));

      // Act
      await component.ngOnInit();

      // Assert
      expect(component.isLoading).toBeFalse();
      expect(component.perfilForm.value).toEqual({
        name: 'John Doe',
        number: '123456789',
        email: 'john.doe@example.com',
        dateOfBirth: '1990-01-01', // Form control value should be a string
        cpf: '12345678900'
      });
    });

    it('should handle error while loading user data', async () => {
      // Arrange
      spyOn(userProfileService, 'GetUserById').and.returnValue(throwError(() => new Error('Error')));

      // Act
      await component.ngOnInit();

      // Assert
      expect(component.isLoading).toBeFalse(); // isLoading should be false even on error
    });
  });

  describe('onSubmit', () => {
    it('should update user profile when form is valid', () => {
      // Arrange
      const mockUserProfile: UserProfile = {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', // Use a GUID here
        name: 'John Doe',
        number: '123456789',
        email: 'john.doe@example.com',
        dateOfBirth: new Date('1990-01-01'), // Use a Date object here
        cpf: '12345678900'
      };

      component.userProfile = mockUserProfile;
      component.perfilForm.setValue({
        name: 'John Updated',
        number: '987654321',
        email: 'john.doe@example.com',
        dateOfBirth: '1990-01-01', // Use a string in the form
        cpf: '12345678900'
      });

      const updatedProfile: UserProfile = {
        ...mockUserProfile,
        name: 'John Updated',
        number: '987654321',
        dateOfBirth: new Date('1990-01-01') // Ensure this is a Date object
      };

      spyOn(userProfileService, 'UpdateUserProfile').and.returnValue(of(updatedProfile));

      // Act
      component.onSubmit();

      // Assert
      expect(userProfileService.UpdateUserProfile).toHaveBeenCalledWith('3fa85f64-5717-4562-b3fc-2c963f66afa6', updatedProfile);
    });
  });
});
