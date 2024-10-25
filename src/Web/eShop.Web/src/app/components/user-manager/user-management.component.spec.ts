import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { UserManagementComponent } from './user-management.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute } from '@angular/router';


describe('UserManagementComponent', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;
  let jwtSpy = jasmine.createSpyObj('JwtHelperService', ['isTokenExpired', 'decodeToken']);
  let activatedRouteSpy = {
    snapshot: {
      paramMap: {
        get: () => null
      }
    }
  };

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [UserManagementComponent, HttpClientTestingModule],
      providers: [
        { provide: MatDialog, useValue: {} },
        { provide: JwtHelperService, useValue: jwtSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
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
