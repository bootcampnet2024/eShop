import { Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { StaticCarouselComponent } from './public/static-carousel/static-carousel.component';
import { ProductDisplayComponent } from './public/product-display/product-display.component';
import { CategoryDisplayComponent } from './public/category-display/category-display.component';
import { LandingPageComponent } from './public/landing-page/landing-page.component';
import { LoginPageComponent } from './public/login-page/login-page.component';
import { SigninPageComponent } from './public/signin-page/signin-page.component';

export const routes: Routes = [
    {path: 'teste', component: LandingPageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'signin', component: SigninPageComponent}
];
