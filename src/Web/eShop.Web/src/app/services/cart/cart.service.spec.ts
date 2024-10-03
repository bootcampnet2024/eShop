import { TestBed } from "@angular/core/testing";

import { CartService } from "./cart.service";
import { appConfig } from "../../app.config";

describe("CartService", () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...appConfig.providers],
    });
    service = TestBed.inject(CartService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
