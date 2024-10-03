import { TestBed } from '@angular/core/testing';
import { UserManagementService } from './user-management.service';
import { provideHttpClient } from '@angular/common/http';
import { appConfig } from '../../app.config';

describe('UserManagementService', () => {
  let service: UserManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ...appConfig.providers ]
    });
    service = TestBed.inject(UserManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
