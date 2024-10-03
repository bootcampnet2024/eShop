import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CreateCategoryModalComponent } from "./create-category-modal.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { appConfig } from "../../../../app.config";
import { MatDialogRef } from "@angular/material/dialog";

describe("CreateCategoryModalComponent", () => {
  let component: CreateCategoryModalComponent;
  let fixture: ComponentFixture<CreateCategoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CreateCategoryModalComponent,
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
        {provide: MatDialogRef, useValue: {}},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
