import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CreateBrandModalComponent } from "./create-brand-modal.component";
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatGridListModule } from "@angular/material/grid-list";
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { appConfig } from "../../../../app.config";

describe("CreateBrandModalComponent", () => {
  let component: CreateBrandModalComponent;
  let fixture: ComponentFixture<CreateBrandModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CreateBrandModalComponent,
        MatButtonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatGridListModule,
      ],
      providers: [
        provideHttpClientTesting(),
        ...appConfig.providers,
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateBrandModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
