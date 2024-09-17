import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/home/landing-page/landing-page.component';
import { LoginPageComponent } from './components/authentication/login-page/login-page.component';
import { SigninPageComponent } from './components/authentication/signin-page/signin-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { AuthGuard } from './guard/auth.guard';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProductManagementComponent } from './components/product-management/product-management.component';


export const routes: Routes = [
    {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
    {path: '', component: LandingPageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'signin', component: SigninPageComponent},
    {path: 'cart', component: CartPageComponent},
    {path: 'product', component: ProductPageComponent},
    {path: 'payment', component: PaymentPageComponent},
    {path: 'search', component: SearchResultComponent},
    {path: 'category', component: CategoryPageComponent},
    {path: 'product-management', component: ProductManagementComponent}
];
