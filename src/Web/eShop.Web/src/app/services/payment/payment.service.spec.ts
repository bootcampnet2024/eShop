import { TestBed } from '@angular/core/testing';
import { PaymentService } from './payment.service';
import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('PaymentService', () => {
  let service: PaymentService;
  let httpMock: HttpTestingController;
  let jwtHelperSpy: jasmine.SpyObj<JwtHelperService>;

  beforeEach(() => {
    jwtHelperSpy = jasmine.createSpyObj('JwtHelperService', ['decodeToken']);
    jwtHelperSpy.decodeToken.and.returnValue({ userId: 'mocked-user-id' });

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PaymentService,
        { provide: JwtHelperService, useValue: jwtHelperSpy },
      ]
    });

    service = TestBed.inject(PaymentService);
    httpMock = TestBed.inject(HttpTestingController);
    jwtHelperSpy = TestBed.inject(JwtHelperService) as jasmine.SpyObj<JwtHelperService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call processPayment and return success response', () => {
    const mockPaymentData = { amount: 100, currency: 'USD', method: 'credit_card' };
    const mockResponse = { status: 'success', transactionId: '12345' };
  
    service.processPayment(mockPaymentData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should handle error response in processPayment', () => {
    const mockPaymentData = { amount: 100, currency: 'USD', method: 'credit_card' };
    const mockErrorResponse = { status: 'fail', message: 'Payment failed' };
    const errorResponse = new HttpErrorResponse({
      error: mockErrorResponse,
      status: 400,
      statusText: 'Bad Request'
    });
  
    service.processPayment(mockPaymentData).subscribe({
      next: () => fail('Expected an error, but got a response'),
      error: error => {
        expect(error.status).toBe(400);
        expect(error.error).toEqual(mockErrorResponse);
      }
    });
  
    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    req.flush(mockErrorResponse, { status: 400, statusText: 'Bad Request' });
  });
});
