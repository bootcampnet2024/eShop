import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UpdateBrandModalComponent } from "./update-brand-modal.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { appConfig } from "../../../../app.config";

describe("UpdateBrandModalComponent", () => {
  let component: UpdateBrandModalComponent;
  let fixture: ComponentFixture<UpdateBrandModalComponent>;

  beforeEach(async () => {
    const dialogRefMock = {
      close: jasmine.createSpy('close'),  // mock the close method
    };
    await TestBed.configureTestingModule({
      imports: [
        UpdateBrandModalComponent,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
      ],
      providers: [
        provideHttpClientTesting(),
        ...appConfig.providers,
        {provide: MAT_DIALOG_DATA, useValue: []},
        {provide: MatDialogRef, useValue: dialogRefMock},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateBrandModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
