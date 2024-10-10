import { TestBed } from "@angular/core/testing";

import { ProductManagementService } from "./product-management.service";
import { appConfig } from "../../app.config";

describe("ProductManagementService", () => {
  let service: ProductManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...appConfig.providers],
    });
    service = TestBed.inject(ProductManagementService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
