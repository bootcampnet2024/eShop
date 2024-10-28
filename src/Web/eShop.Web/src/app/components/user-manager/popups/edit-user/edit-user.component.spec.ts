import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EditUserComponent } from './edit-user.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;
  let jwtSpy = jasmine.createSpyObj('JwtHelperService', ['isTokenExpired', 'decodeToken']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUserComponent, HttpClientTestingModule],
      providers: [
        { provide: JwtHelperService, useValue: jwtSpy },
        { provide: MatDialogRef, useValue: {} },
        { provide: ActivatedRoute, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
