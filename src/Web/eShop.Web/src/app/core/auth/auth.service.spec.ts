import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';

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

    authService.signin('newUser', 'password', 'email@example.com', '123 Address', '12345', `1234`, '123456789').subscribe(response => {
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

  it('should return the correct route based on role', () => {
    jwtHelperSpy.decodeToken.and.returnValue({
      realm_access: { roles: ['user-manager'] },
    });

    localStorage.setItem('access_token', 'mockAccessToken');
    expect(authService.getRoles()).toContain('user-manager');
  });
});
