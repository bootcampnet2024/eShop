import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { UserManagementComponent } from './user-management.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

describe('UserManagementComponent', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;
  let jwtSpy = jasmine.createSpyObj('JwtHelperService', ['decodeToken']);
  let activatedRouteSpy = {
    snapshot: {
      paramMap: {
        get: () => null
      }
    }
  };

  let mockAuthService = {
    checkAdminRole: () => true,
    isAuthenticated: () => true 
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserManagementComponent, 
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: [
        { provide: JwtHelperService, useValue: jwtSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
