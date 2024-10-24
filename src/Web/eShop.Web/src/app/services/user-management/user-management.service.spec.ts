import { TestBed } from "@angular/core/testing";
import { UserManagementService } from "./user-management.service";
import { AuthService } from "../../core/auth/auth.service";
import {
  HttpTestingController,
  HttpClientTestingModule,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";
import { User } from "../../models/user.model";
import { appConfig } from "../../app.config";

describe("UserManagementService", () => {
  let userService: UserManagementService;
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy = { navigate: jasmine.createSpy("navigate") };
  let jwtHelperSpy: jasmine.SpyObj<JwtHelperService>;

  beforeEach(async () => {
    const jwtSpy = jasmine.createSpyObj("JwtHelperService", [
      "isTokenExpired",
      "decodeToken",
    ]);

    await TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        ...appConfig.providers,
        AuthService,
        { provide: Router, useValue: routerSpy },
        { provide: JwtHelperService, useValue: jwtSpy },
      ],
    }).compileComponents();

    userService = TestBed.inject(UserManagementService);
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    jwtHelperSpy = TestBed.inject(
      JwtHelperService
    ) as jasmine.SpyObj<JwtHelperService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(userService).toBeTruthy();
  });

  it("should get users by criteria", () => {
    const mockResponse: User[] = [
      {
        id: "mockId",
        username: "mock",
        email: "mock@mock",
        cpf: "38906499809",
        phoneNumber: "(11) 99962-3213",
        roles: ["mockRoles"],
        fullname: "Mock 1",
        updateAt: new Date()
      },
    ];

    userService.getByCriteria("mock").subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
  });

  it("should get all users", () => {
    const mockResponse: User[] = [
      {
        id: "mockId",
        username: "mock",
        email: "mock@mock",
        cpf: "38906499809",
        phoneNumber: "(11) 99962-3213",
        roles: ["mockRoles"],
        fullname: "Mock 1",
        updateAt: new Date()
      },
    ];

    userService.getAll().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
  });

  it("should get number of users", () => {
    const mockResponse = 0;

    userService.getAll().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
  });

  it("should get user profile", () => {
    const mockResponse = {
      username: "mock",
      email: "mock@mock",
      cpf: "38906499809",
      phoneNumber: "(11) 99962-3213",
      sub: "mockID",
      roles: ["mockRoles"],
    };

    userService.getProfile().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
  });

  it("should edit user profile", () => {
    const mockResponse = {
      username: "mock",
      email: "mock@mock",
      cpf: "38906499809",
      phoneNumber: "(11) 99962-3213",
      id: "mockID",
      roles: ["mockRoles"],
    };

    userService.edit("mockId", mockResponse).subscribe((response) => {
      expect(response).toEqual(200);
    });
  });

  it("should add user profile", () => {
    const mockUser = {
      username: "mock",
      email: "mock@mock",
      cpf: "38906499809",
      phoneNumber: "(11) 99962-3213",
      sub: "mockID",
      roles: ["mockRoles"],
    };

    userService.add(mockUser.toString()).subscribe((response) => {
      expect(response).toEqual(200);
    });
  });

  it("should delete user profile", () => {
    userService.delete("id").subscribe((response) => {
      expect(response).toEqual(200);
    });
  });

  it("should add user profile to Group", () => {
    userService.addToGroup("mockid", "mockGroup").subscribe((response) => {
      expect(response).toEqual(200);
    });
  });

  it("should delete user profile from Group", () => {
    userService.deleteFromGroup("mockid", "mockGroup").subscribe((response) => {
      expect(response).toEqual(200);
    });
  });
});
