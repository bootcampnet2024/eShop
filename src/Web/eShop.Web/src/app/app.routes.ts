import { ContactComponent } from './components/contact/contact.component';
import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/home/landing-page/landing-page.component';
import { LoginPageComponent } from './components/authentication/login-page/login-page.component';
import { SigninPageComponent } from './components/authentication/signin-page/signin-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { AuthGuard } from './core/auth/guard/auth.guard';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { CategoryManagementComponent } from './components/category-management/category-management.component';
import { UserManagementComponent } from './components/user-manager/user-management.component';
import { BrandManagementComponent } from './components/brand-management/brand-management.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { ChangeUserRolesComponent } from './components/user-manager/popups/change-user-roles/change-user-roles.component';
import { AddressPageComponent } from './components/address-page/address-page.component';
import { UserCardsComponent } from './components/user-cards/user-cards.component';
import { HistoryPageComponent } from './components/history-page/history-page.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderPageComponent } from './components/order-page/order-page.component';

export const routes: Routes = [
    {path: '', component: LandingPageComponent},
    {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
    {path: 'user-cards', component: UserCardsComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginPageComponent},
    {path: 'signin', component: SigninPageComponent},
    {path: 'cart', component: CartPageComponent},
    {path: 'product', component: ProductPageComponent},
    {path: 'payment', component: PaymentPageComponent},
    {path: 'search', component: SearchResultComponent},
    {path: 'category', component: CategoryPageComponent},
    {path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard]},
    {path: 'change-user-role', component: ChangeUserRolesComponent, canActivate: [AuthGuard]},
    {path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuard]},
    {path: 'contact', component: ContactComponent},
    {path: 'policy', component: PrivacyPolicyComponent},
    {path: 'terms', component: TermsOfServiceComponent},
    {path: 'addresses', component: AddressPageComponent},
    {path: 'history', component: HistoryPageComponent},
    {path: 'addresses', component: AddressPageComponent},
    {path: 'orders', component: OrderListComponent, canActivate: [AuthGuard]},
    {path: 'order', component: OrderPageComponent, canActivate: [AuthGuard] },
    {path: 'product-management', component: ProductManagementComponent, canActivate: [AuthGuard]},
    {path: 'category-management', component: CategoryManagementComponent, canActivate: [AuthGuard]},
    {path: 'brand-management', component: BrandManagementComponent, canActivate: [AuthGuard]}
];
