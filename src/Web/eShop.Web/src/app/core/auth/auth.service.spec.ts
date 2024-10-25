import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { of } from 'rxjs';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };
  let jwtHelperSpy: jasmine.SpyObj<JwtHelperService>;

  beforeEach(async () => {
    const jwtSpy = jasmine.createSpyObj('JwtHelperService', ['isTokenExpired', 'decodeToken']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy },
        { provide: JwtHelperService, useValue: jwtSpy },
      ],
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    jwtHelperSpy = TestBed.inject(JwtHelperService) as jasmine.SpyObj<JwtHelperService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should login and store tokens', () => {
    const mockResponse = {
      access_token: 'mockAccessToken',
      refresh_token: 'mockRefreshToken',
      expires_in: 3600,
      refresh_expires_in: 36000,
      token_type: 'Bearer',
      'not-before-policy': 0,
      session_state: 'session123',
      scope: 'openid',
    };

    authService.login('testUser', 'testPassword').subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(authService['adminUrl']);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    expect(localStorage.getItem('access_token')).toEqual('mockAccessToken');
    expect(localStorage.getItem('refresh_token')).toEqual('mockRefreshToken');
  });

  it('should sign in a user', () => {
    const mockTokenResponse = {
      access_token: 'mockAccessToken',
      refresh_token: 'mockRefreshToken',
      expires_in: 3600,
      refresh_expires_in: 36000,
      token_type: 'Bearer',
      'not-before-policy': 0,
      session_state: 'session123',
      scope: 'openid',
    };

    const mockSignUpResponse = { id: '1234' };

    authService.signin('newUser', 'password', 'email@example.com', '123 Address', '12345', '123456789').subscribe(response => {
      expect(response).toEqual(mockSignUpResponse);
    });

    const tokenReq = httpMock.expectOne(authService['adminUrl']);
    expect(tokenReq.request.method).toBe('POST');
    tokenReq.flush(mockTokenResponse);

    const userReq = httpMock.expectOne(authService['registerUrl']);
    expect(userReq.request.method).toBe('POST');
    expect(userReq.request.body.username).toBe('newUser');
    userReq.flush(mockSignUpResponse);
  });

  it('should logout and clear tokens', () => {
    localStorage.setItem('access_token', 'mockAccessToken');
    localStorage.setItem('refresh_token', 'mockRefreshToken');

    authService.logout();

    expect(localStorage.getItem('access_token')).toBeNull();
    expect(localStorage.getItem('refresh_token')).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should return correct authentication status', () => {
    localStorage.setItem('access_token', 'mockAccessToken');
    expect(authService.isAuthenticated()).toBeTrue();

    localStorage.removeItem('access_token');
    expect(authService.isAuthenticated()).toBeFalse();
  });

  it("should return the correct route based on role", () => {
    jwtHelperSpy.decodeToken.and.returnValue({
      realm_access: { roles: ["user-manager"] },
    });
    localStorage.setItem("access_token", "mockAccessToken");
    expect(authService.getRoles()).toContain("user-manager");
  });
  it("should get user ID by email", () => {
    const mockTokenResponse = {
      access_token: "mockAccessToken",
      refresh_token: "mockRefreshToken",
      expires_in: 3600,
      refresh_expires_in: 36000,
      token_type: "Bearer",
      "not-before-policy": 0,
      session_state: "session123",
      scope: "openid",
    };
    const mockUserResponse = [
      { id: "1234", username: "testUser", email: "email@example.com" },
    ];
    authService.getAdminToken = jasmine
      .createSpy()
      .and.returnValue(of(mockTokenResponse));
    authService.getUserIdByEmail("email@example.com").subscribe((userId) => {
      expect(userId).toEqual("1234");
    });
    const req = httpMock.expectOne(
      "http://localhost:8070/admin/realms/eshop/users?email=email@example.com"
    );
    expect(req.request.method).toBe("GET");
    req.flush(mockUserResponse);
  });
  it("should handle error when user is not found", () => {
    const mockTokenResponse = {
      access_token: "mockAccessToken",
      refresh_token: "mockRefreshToken",
      expires_in: 3600,
      refresh_expires_in: 36000,
      token_type: "Bearer",
      "not-before-policy": 0,
      session_state: "session123",
      scope: "openid",
    };
    authService.getAdminToken = jasmine
      .createSpy()
      .and.returnValue(of(mockTokenResponse));
    authService.getUserIdByEmail("email@example.com").subscribe({
      next: () => fail("Expected error, but got user ID"),
      error: (error) => {
        expect(error.message).toBe("User not found");
      },
    });
    const req = httpMock.expectOne(
      "http://localhost:8070/admin/realms/eshop/users?email=email@example.com"
    );
    expect(req.request.method).toBe("GET");
    req.flush([]);
  });
  it('should recover password by user ID', () => {
    const mockTokenResponse = {
      access_token: 'mockAccessToken',
      refresh_token: 'mockRefreshToken',
      expires_in: 3600,
      refresh_expires_in: 36000,
      token_type: 'Bearer',
      'not-before-policy': 0,
      session_state: 'session123',
      scope: 'openid',
    };
  
    spyOn(authService, 'getAdminToken').and.returnValue(of(mockTokenResponse));
  
    authService.recoverPassword('123').subscribe();
  
    const req = httpMock.expectOne(
      'http://localhost:8070/admin/realms/eshop/users/123/reset-password-email?client_id=account-user&redirect_uri=http://localhost:4200/login'
    );
    expect(req.request.method).toBe('PUT');
    req.flush({}); 
  });
  
  
  it("should handle error when recovering password fails", (done) => {
    const mockTokenResponse = {
      access_token: "mockAccessToken",
      refresh_token: "mockRefreshToken",
      expires_in: 3600,
      refresh_expires_in: 36000,
      token_type: "Bearer",
      "not-before-policy": 0,
      session_state: "session123",
      scope: "openid",
    };
  
    spyOn(authService, "getAdminToken").and.returnValue(of(mockTokenResponse));
  
    authService.recoverPassword("1234").subscribe({
      next: () => {
        fail("Expected error, but password recovery succeeded");
        done();
      },
      error: (error) => {
        expect(error.status).toBe(400);
        done();
      },
    });
  
    const req = httpMock.expectOne(
      "http://localhost:8070/admin/realms/eshop/users/1234/reset-password-email?client_id=account-user&redirect_uri=http://localhost:4200/login"
    );
    expect(req.request.method).toBe("PUT");
    req.flush("Error recovering password", {
      status: 400,
      statusText: "Bad Request",
    });
  });
  
  it('should correctly check if the token is expired', async () => {
    const mockToken = 'mockAccessToken';
    
    jwtHelperSpy.isTokenExpired.and.returnValue(Promise.resolve(false));
    expect(await authService['isTokenExpired'](mockToken)).toBeFalse();
    
    jwtHelperSpy.isTokenExpired.and.returnValue(Promise.resolve(true));
    expect(await authService['isTokenExpired'](mockToken)).toBeTrue();
  });
});
