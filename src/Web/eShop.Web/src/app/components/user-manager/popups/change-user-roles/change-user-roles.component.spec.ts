import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ChangeUserRolesComponent } from "./change-user-roles.component";

describe("ChangeUserRolesComponent", () => {
  let component: ChangeUserRolesComponent;
  let fixture: ComponentFixture<ChangeUserRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeUserRolesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeUserRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
