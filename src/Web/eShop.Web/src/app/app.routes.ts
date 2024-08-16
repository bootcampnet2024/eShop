import { Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { LandingPageComponent } from './components/home/landing-page/landing-page.component';
import { LoginPageComponent } from './components/authentication/login-page/login-page.component';
import { SigninPageComponent } from './components/authentication/signin-page/signin-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    {path: 'user', component: UserPageComponent, canActivate: [AuthGuard]},
    {path: '', component: LandingPageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'signin', component: SigninPageComponent},
    {path: 'cart', component: CartPageComponent},
    {path: 'product', component: ProductPageComponent},
    {path: 'payment', component: PaymentPageComponent}
];
