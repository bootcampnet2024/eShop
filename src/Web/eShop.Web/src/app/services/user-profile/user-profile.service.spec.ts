import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserProfileService } from './user-profile.service';
import { UserProfile } from '../../models/user-profile.model';

describe('UserProfileService', () => {
  let service: UserProfileService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserProfileService]
    });
    service = TestBed.inject(UserProfileService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('GetUserById', () => {
    it('should return a user profile', () => {
      // Arrange
      const mockUserProfile: UserProfile = {
        id: '1',
        name: 'John Doe',
        number: '123456789',
        email: 'john.doe@example.com',
        dateOfBirth: new Date('1990-01-01'),
        cpf: '12345678900'
      };

      // Act
      service.GetUserById('1').subscribe((userProfile) => {
        // Assert
        expect(userProfile).toEqual(mockUserProfile);
      });

      const req = httpMock.expectOne('https://localhost:7231/api/Users/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockUserProfile);
    });
  });

  describe('UpdateUserProfile', () => {
    it('should update and return the user profile', () => {
      // Arrange
      const mockUserProfile: UserProfile = {
        id: '1',
        name: 'John Doe',
        number: '123456789',
        email: 'john.doe@example.com',
        dateOfBirth: new Date('1990-01-01'),
        cpf: '12345678900'
      };

      // Act
      service.UpdateUserProfile('1', mockUserProfile).subscribe((userProfile) => {
        // Assert
        expect(userProfile).toEqual(mockUserProfile);
      });

      const req = httpMock.expectOne('https://localhost:7231/api/Users/1');
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(mockUserProfile);
      req.flush(mockUserProfile);
    });
  });
});
