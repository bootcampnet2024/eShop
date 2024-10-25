import { TestBed } from "@angular/core/testing";
import { UserManagementService } from "./user-management.service";
import { AuthService } from "../../core/auth/auth.service";
import {
  HttpTestingController,
  HttpClientTestingModule,
} from "@angular/common/http/testing";
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from "../../models/user.model";

describe("UserManagementService", () => {
  let userService: UserManagementService;
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let jwtHelperSpy: jasmine.SpyObj<JwtHelperService>;
  const mockToken = "mockToken";

  const mockUser: User = {
    id: "mockId",
    username: "mockUser",
    fullname: "Mock User",
    email: "mock@user.com",
    cpf: "12345678900",
    phoneNumber: "1234567890",
    roles: ["user"],
    updateAt: new Date(),
  };

  beforeEach(() => {
    const jwtSpy = jasmine.createSpyObj("JwtHelperService", ["decodeToken"]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserManagementService,
        AuthService,
        { provide: JwtHelperService, useValue: jwtSpy },
      ],
    });

    userService = TestBed.inject(UserManagementService);
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    jwtHelperSpy = TestBed.inject(
      JwtHelperService
    ) as jasmine.SpyObj<JwtHelperService>;

    spyOn(authService, 'getAccessToken').and.returnValue(mockToken);
    jwtHelperSpy.decodeToken.and.returnValue({
      sub: "mockId",
      preferred_username: "mockUser",
      name: "Mock User",
      email: "mock@user.com",
      cpf: "12345678900",
      phone_number: "1234567890",
      realm_access: { roles: ["user"] },
    });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(userService).toBeTruthy();
  });

  it("should get users by criteria", () => {
    const mockResponse: User[] = [mockUser];
    const criteria = { username: "mockUser" };

    userService.getByCriteria(criteria).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne((request) => request.url === `${userService['baseUrl']}`);
    expect(req.request.method).toBe("GET");
    expect(req.request.params.get("username")).toBe("mockUser");
    req.flush(mockResponse);
  });

  it("should get all users", () => {
    const mockResponse: User[] = [mockUser];

    userService.getAll().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(userService['baseUrl']);
    expect(req.request.method).toBe("GET");
    req.flush(mockResponse);
  });

  it("should get number of users", () => {
    const mockCount = 1;

    userService.getUsersCount().subscribe((response) => {
      expect(response).toEqual(mockCount);
    });

    const req = httpMock.expectOne(`${userService['baseUrl']}/count`);
    expect(req.request.method).toBe("GET");
    req.flush(mockCount);
  });

  it("should get user profile", () => {
    userService.getProfile().subscribe((profile) => {
      expect(profile).toEqual({
        id: "mockId",
        username: "mockUser",
        fullName: "Mock User",
        email: "mock@user.com",
        cpf: "12345678900",
        phoneNumber: "1234567890",
        updateAt: mockUser.updateAt,
        roles: ["user"],
      });
    });
  });

  it("should edit a user", () => {
    const updatedUser: Partial<User> = { fullname: "Updated User" };

    userService.edit(mockUser.id, updatedUser).subscribe((response) => {
      expect(response).toEqual(updatedUser);
    });

    const req = httpMock.expectOne(`${userService['baseUrl']}/${mockUser.id}`);
    expect(req.request.method).toBe("PUT");
    req.flush(updatedUser);
  });

  it("should add a new user", () => {
    userService.add(mockUser).subscribe((response) => {
      expect(response).toEqual(mockUser);
    });

    const req = httpMock.expectOne(userService['baseUrl']);
    expect(req.request.method).toBe("POST");
    req.flush(mockUser);
  });

  it("should delete a user", () => {
    userService.delete(mockUser.id).subscribe((response) => {
      expect(response).toBe(null);
    });

    const req = httpMock.expectOne(`${userService['baseUrl']}/${mockUser.id}`);
    expect(req.request.method).toBe("DELETE");
    req.flush(null);
  });

  it("should add user to a group", () => {
    const groupId = "groupId";

    userService.addToGroup(mockUser.id, groupId).subscribe((response) => {
      expect(response).toBe(null);
    });

    const req = httpMock.expectOne(`${userService['baseUrl']}/${mockUser.id}/groups/${groupId}`);
    expect(req.request.method).toBe("PUT");
    req.flush(null);
  });

  it("should delete user from a group", () => {
    const groupId = "groupId";

    userService.deleteFromGroup(mockUser.id, groupId).subscribe((response) => {
      expect(response).toBe(null);
    });

    const req = httpMock.expectOne(`${userService['baseUrl']}/${mockUser.id}/groups/${groupId}`);
    expect(req.request.method).toBe("DELETE");
    req.flush(null);
  });
});
