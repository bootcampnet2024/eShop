import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { UserProfileComponent } from "./user-profile.component";
import { of, throwError } from "rxjs";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { RouterTestingModule } from "@angular/router/testing";
import { UserManagementService } from "../../services/user-management/user-management.service";
import { provideHttpClient } from "@angular/common/http";
import { appConfig } from "../../app.config";

describe("UserProfileComponent", () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let userService: jasmine.SpyObj<UserManagementService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj("UserManagementService", {
      getProfile: of({ id: "12345", username: "Test User", email: "test@example.com", cpf: "12345678901", phoneNumber: "9876543210", fullname: "Test Fullname", updateAt: new Date() }),
      edit: of({ success: true }),
    });

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
        UserProfileComponent,
      ],
      providers: [
        provideHttpClient(),
        ...appConfig.providers,
        { provide: UserManagementService, useValue: userServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserManagementService) as jasmine.SpyObj<UserManagementService>;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load user data on init", () => {
    component.loadUserData();
    expect(userService.getProfile).toHaveBeenCalled();
  });

  it("should patch the form with user data", () => {
    const mockUser = {
      username: 'Test User',
      email: 'test@example.com',
      attributes: {
        full_name: ['Test Fullname'],
        cpf: ['12345678901'],
        phone_number: ['9876543210'],
      },
    };
  
    spyOn(userService, 'getProfile').and.returnValue(of(mockUser)); 
    
    component.loadUserData();
    
    expect(component.perfilForm.get('username')?.value).toBe("Test User");
    expect(component.perfilForm.get('email')?.value).toBe("test@example.com");
    expect(component.perfilForm.get('fullname')?.value).toBe("Test Fullname");
  });
  

  it("should log an error if loading user data fails", () => {
    userService.getProfile.and.returnValue(throwError(new Error("Error loading user data")));
    spyOn(console, 'error');
    component.loadUserData();
    expect(console.error).toHaveBeenCalledWith('Error loading user data:', jasmine.any(Error));
  });

  it("should enable email field and update profile", () => {
    component.perfilForm.patchValue({
      username: 'New Username',
      email: 'new@example.com',
      fullname: 'New Fullname',
      cpf: '12345678901',
      phoneNumber: '9876543210',
      updateAt: new Date(new Date().getTime() - 8 * 24 * 60 * 60 * 1000),
    });
    component.updateProfile();
    expect(userService.edit).toHaveBeenCalledWith('12345', jasmine.any(Object));
  });

  it("should not update profile if the form is invalid", () => {
    component.perfilForm.patchValue({ username: '' });
    component.updateProfile();
    expect(userService.edit).not.toHaveBeenCalled();
  });

  it("should not enable email field or update profile if the time difference is less than 7 days", () => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); 
  
    component.perfilForm.patchValue({
      username: 'Valid Username',
      email: 'valid@example.com',
      fullname: 'Valid Fullname',
      cpf: '12345678901',
      phoneNumber: '9876543210',
      updateAt: sevenDaysAgo,  
    });
  
    spyOn(userService, 'edit'); 
    component.updateProfile();    
    expect(userService.edit).not.toHaveBeenCalled();  
  });
  
});
