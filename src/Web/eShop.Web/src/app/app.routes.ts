import { Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SigninPageComponent } from './components/signin-page/signin-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';


export const routes: Routes = [
    {path: '', component: LandingPageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'signin', component: SigninPageComponent},
    {path: 'cart', component: CartPageComponent}
];
