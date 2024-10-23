import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../../core/auth/auth.service';
import { RecoverPasswordModalComponent } from './recover-password-modal.component';
import { of, throwError } from 'rxjs';
describe('RecoverPasswordModalComponent', () => {
  let component: RecoverPasswordModalComponent;
  let fixture: ComponentFixture<RecoverPasswordModalComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<RecoverPasswordModalComponent>>;
  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['getUserIdByEmail', 'recoverPassword']);
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RecoverPasswordModalComponent
      ],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(RecoverPasswordModalComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<RecoverPasswordModalComponent>>;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call recoverPassword on AuthService', () => {
    const email = 'test@example.com';
    const userId = '12345';
    component.resetEmail = email;
    authServiceSpy.getUserIdByEmail.and.returnValue(of(userId));
    authServiceSpy.recoverPassword.and.returnValue(of({ success: true }));
    component.recoverPassword();
    expect(authServiceSpy.getUserIdByEmail).toHaveBeenCalledWith(email);
    expect(authServiceSpy.getUserIdByEmail).toHaveBeenCalledTimes(1);
    expect(authServiceSpy.recoverPassword).toHaveBeenCalledWith(userId);
    expect(authServiceSpy.recoverPassword).toHaveBeenCalledTimes(1);
  });
  it('should close the dialog on successful recovery', () => {
    const email = 'test@example.com';
    const userId = '12345';
    component.resetEmail = email;
    authServiceSpy.getUserIdByEmail.and.returnValue(of(userId));
    authServiceSpy.recoverPassword.and.returnValue(of({ success: true }));
    component.recoverPassword();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
  it('should handle error response when user not found', () => {
    const email = 'test@example.com';
    component.resetEmail = email;
  
    spyOn(console, 'error'); 
  
    authServiceSpy.getUserIdByEmail.and.returnValue(of('')); 
    authServiceSpy.recoverPassword.and.returnValue(of({ success: true }));
  
    component.recoverPassword();
  
    expect(console.error).toHaveBeenCalledWith('User not found.'); 
  });
  
  
  it('should handle error response from recoverPassword', () => {
    const email = 'test@example.com';
    const userId = '12345';
    component.resetEmail = email;
    spyOn(console, 'error');
    authServiceSpy.getUserIdByEmail.and.returnValue(of(userId));
    authServiceSpy.recoverPassword.and.returnValue(throwError(() => new Error('Error!')));
    component.recoverPassword();
    expect(console.error).toHaveBeenCalledWith('Error to recover password', jasmine.any(Error));
  });
  it('should close the dialog', () => {
    component.close();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
  it('should handle error response when fetching user ID fails', () => {
    const email = 'test@example.com';
    component.resetEmail = email;
  
    spyOn(console, 'error'); 
  
    authServiceSpy.getUserIdByEmail.and.returnValue(throwError(() => new Error('Error fetching user ID')));
  
    component.recoverPassword();
  
    expect(console.error).toHaveBeenCalledWith('Error fetching user ID', jasmine.any(Error));
  });
  
});