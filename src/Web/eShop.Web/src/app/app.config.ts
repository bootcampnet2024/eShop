<<<<<<< HEAD
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
=======
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

>>>>>>> 94d62f4 (global css in authentication and category page)
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
<<<<<<< HEAD
=======
import { provideClientHydration } from '@angular/platform-browser';
>>>>>>> 94d62f4 (global css in authentication and category page)
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
<<<<<<< HEAD
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
=======
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
>>>>>>> 94d62f4 (global css in authentication and category page)

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
<<<<<<< HEAD
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS,
    },
=======
    provideAnimations(),
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
>>>>>>> 94d62f4 (global css in authentication and category page)
    JwtHelperService,
  ],
};
