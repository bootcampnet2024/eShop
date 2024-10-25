import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthResponse } from './AuthResponse.model';
import { User } from '../../models/user.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerMock = { navigate: jasmine.createSpy('navigate') };
  let jwtHelper: JwtHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerMock },
        JwtHelperService
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    jwtHelper = TestBed.inject(JwtHelperService);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear(); 
  });

  it('should successfully login and store tokens', () => {
    const mockResponse: AuthResponse = {
      access_token: 'seu_access_token_aqui',
      refresh_token: 'seu_refresh_token_aqui',
      expires_in: 3600,
      token_type: 'Bearer',
      refresh_expires_in: 3600, 
      'not-before-policy': 0, 
      session_state: 'estado_da_sessão', 
      scope: 'escopo_aqui' 
    };

    service.login('testuser', 'testpassword').subscribe(response => {
      expect(response.access_token).toEqual(mockResponse.access_token);
      expect(localStorage.getItem('access_token')).toEqual(mockResponse.access_token);
      expect(localStorage.getItem('refresh_token')).toEqual(mockResponse.refresh_token);
    });

    const req = httpMock.expectOne(service['adminUrl']);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should handle login error when credentials are invalid', () => {
    service.login('wronguser', 'wrongpassword').subscribe(
      () => fail('Expected an error, not user data'),
      (error) => {
        expect(error.message).toContain('Credenciais inválidas');
      }
    );

    const req = httpMock.expectOne(service['adminUrl']);
    req.flush('Invalid credentials', { status: 400, statusText: 'Bad Request' });
  });

  it('should handle login error for unauthorized request', () => {
    service.login('testuser', 'testpassword').subscribe(
      () => fail('Expected an error, not user data'),
      (error) => {
        expect(error.message).toContain('Não autorizado. Verifique suas credenciais de cliente.');
      }
    );

    const req = httpMock.expectOne(service['adminUrl']);
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
  });

  it('should register a user successfully', () => {
    const adminResponse: AuthResponse = {
      access_token: 'seu_access_token_aqui',
      refresh_token: 'seu_refresh_token_aqui',
      expires_in: 3600,
      token_type: 'Bearer',
      refresh_expires_in: 3600, 
      'not-before-policy': 0, 
      session_state: 'estado_da_sessão', 
      scope: 'escopo_aqui' 
    };

    const registerResponse = { id: 'newUserId' };

    service.signin('testuser', 'Test User', 'password', 'test@example.com', '123 Main St', '123456789', '12345678901').subscribe(response => {
      expect(response).toEqual(registerResponse);
    });

    const adminReq = httpMock.expectOne(service['adminUrl']);
    expect(adminReq.request.method).toBe('POST');
    adminReq.flush(adminResponse);

    const registerReq = httpMock.expectOne(service['registerUrl']);
    expect(registerReq.request.method).toBe('POST');
    expect(registerReq.request.body).toEqual({
      username: 'testuser',
      full_name: 'Test User',
      enabled: true,
      emailVerified: true,
      email: 'test@example.com',
      attributes: {
        phone_number: ['123456789'],
        cpf: '12345678901',
        address: ['123 Main St'],
      },
      credentials: [
        {
          type: 'password',
          value: 'password',
          temporary: false,
        },
      ],
      groups: ['user'],
    });
    registerReq.flush(registerResponse);
  });

  it('should handle registration error when email is already in use', () => {
    const adminResponse: AuthResponse = {
      access_token: 'seu_access_token_aqui',
      refresh_token: 'seu_refresh_token_aqui',
      expires_in: 3600,
      token_type: 'Bearer',
      refresh_expires_in: 3600, 
      'not-before-policy': 0, 
      session_state: 'estado_da_sessão', 
      scope: 'escopo_aqui' 
    };


    service.signin('testuser', 'Test User', 'password', 'test@example.com', '123 Main St', '123456789', '12345678901').subscribe(
      () => fail('Expected an error, not user data'),
      (error) => {
        expect(error.message).toContain('Nome de usuário ou email já em uso.');
      }
    );

    const adminReq = httpMock.expectOne(service['adminUrl']);
    expect(adminReq.request.method).toBe('POST');
    adminReq.flush(adminResponse);

    const registerReq = httpMock.expectOne(service['registerUrl']);
    expect(registerReq.request.method).toBe('POST');
    registerReq.flush('Conflict', { status: 409, statusText: 'Conflict' });
  });

  it('should handle registration error for unauthorized request', () => {
    service.signin('testuser', 'Test User', 'password', 'test@example.com', '123 Main St', '123456789', '12345678901').subscribe(
      () => fail('Expected an error, not user data'),
      (error) => {
        expect(error.message).toContain('Não autorizado. Verifique suas credenciais.');
      }
    );

    const adminReq = httpMock.expectOne(service['adminUrl']);
    expect(adminReq.request.method).toBe('POST');
    adminReq.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
  });

  it('should logout and clear tokens', () => {
    localStorage.setItem('access_token', 'mockAccessToken');
    localStorage.setItem('refresh_token', 'mockRefreshToken');

    service.logout();

    expect(localStorage.getItem('access_token')).toBeNull();
    expect(localStorage.getItem('refresh_token')).toBeNull();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should check if user is authenticated', () => {
    localStorage.setItem('access_token', 'mockAccessToken');

    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should return false if access token is not present', () => {
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should get roles from token', () => {
    localStorage.setItem('access_token', 'mockAccessToken');

    spyOn(jwtHelper, 'decodeToken').and.returnValue({
      realm_access: {
        roles: ['user', 'admin'],
      },
    });

    const roles = service.getRoles();
    expect(roles).toEqual(['user', 'admin']);
  });

  it('should return empty array if token is not present', () => {
    const roles = service.getRoles();
    expect(roles).toEqual([]);
  });

  it('should get user ID by email', () => {
    const adminResponse: AuthResponse = {
      access_token: 'seu_access_token_aqui',
      refresh_token: 'seu_refresh_token_aqui',
      expires_in: 3600,
      token_type: 'Bearer',
      refresh_expires_in: 3600, 
      'not-before-policy': 0, 
      session_state: 'estado_da_sessão', 
      scope: 'escopo_aqui' 
   };


    const userResponse: User[] = [{
      id: 'userId',
      email: 'test@example.com',
      fullname: 'Nome Completo',   
      username: 'nome_de_usuario',  
      cpf: '123.456.789-00',        
      phoneNumber: '1234567890',  
      updateAt: new Date(),          
    roles: ['user', 'admin'],   
    }]; 

    service.getUserIdByEmail('test@example.com').subscribe(userId => {
      expect(userId).toEqual('userId');
    });

    const adminReq = httpMock.expectOne(service['adminUrl']);
    expect(adminReq.request.method).toBe('POST');
    adminReq.flush(adminResponse);

    const userReq = httpMock.expectOne(`http://localhost:8070/admin/realms/eshop/users?email=test@example.com`);
    expect(userReq.request.method).toBe('GET');
    userReq.flush(userResponse);
  });

  it('should return empty string if no user found by email', () => {
    const adminResponse: AuthResponse = {
      access_token: 'seu_access_token_aqui',
      refresh_token: 'seu_refresh_token_aqui',
      expires_in: 3600,
      token_type: 'Bearer',
      refresh_expires_in: 3600, 
      'not-before-policy': 0, 
      session_state: 'estado_da_sessão', 
      scope: 'escopo_aqui' 
    };


    service.getUserIdByEmail('notfound@example.com').subscribe(userId => {
      expect(userId).toEqual('');
    });

    const adminReq = httpMock.expectOne(service['adminUrl']);
    expect(adminReq.request.method).toBe('POST');
    adminReq.flush(adminResponse);

    const userReq = httpMock.expectOne(`http://localhost:8070/admin/realms/eshop/users?email=notfound@example.com`);
    expect(userReq.request.method).toBe('GET');
    userReq.flush([]);
  });
});
