import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { UserProfileComponent } from './user-profile.component';
import { AuthService } from '../../services/authentication/auth.service';
import { of, throwError } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getUserProfile', 'updateProfile']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        HeaderComponent,
        FooterComponent,
        RouterTestingModule,
        UserProfileComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user data', () => {
    const mockUserData = {
      preferred_username: 'testuser',
      attributes: { phoneNumber: '1234567890' },
      email: 'test@example.com',
      cpf: '12345678901',
      cep: '12345-678',
      sub: 'user123'
    };
    authService.getUserProfile.and.returnValue(of(mockUserData));

    component.ngOnInit();

    fixture.detectChanges();

    expect(authService.getUserProfile).toHaveBeenCalled();
    expect(component.perfilForm.value).toEqual({
      username: 'testuser',
      number: '1234567890',
      email: 'test@example.com',
      cpf: '12345678901',
      cep: '12345-678'
    });
    expect(component.userId).toBe('user123');
  });

  it('should handle error when loading user data', () => {
    authService.getUserProfile.and.returnValue(throwError(() => new Error('Error loading user data')));

    component.ngOnInit();

    fixture.detectChanges();

    expect(authService.getUserProfile).toHaveBeenCalled();
  });

  it('should update user profile', () => {
    component.userId = 'user123';

    component.perfilForm.setValue({
      username: 'updateduser',
      number: '0987654321',
      email: 'updated@example.com',
      cpf: '10987654321',
      cep: '87654-321'
    });

    authService.updateProfile.and.returnValue(of({}));

    component.updateProfile();

    expect(authService.updateProfile).toHaveBeenCalledWith('user123', {
      username: 'updateduser',
      email: 'updated@example.com',
      attributes: {
        cpf: '10987654321',
        phoneNumber: '0987654321',
        cep: '87654-321'
      }
    });
  });

  it('should handle error when updating profile', () => {
    component.userId = 'user123';

    component.perfilForm.setValue({
      username: 'updateduser',
      number: '0987654321',
      email: 'updated@example.com',
      cpf: '10987654321',
      cep: '87654-321'
    });

    authService.updateProfile.and.returnValue(throwError(() => new Error('Error updating profile')));

    component.updateProfile();

    expect(authService.updateProfile).toHaveBeenCalled();
  });
});
