import { ContactComponent } from './components/contact/contact.component';
import { Component } from '@angular/core';
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
import { CreateUserManagerComponent } from './components/user-manager/create-user-manager/create-user-manager.component';
import { ViewUserManagerComponent } from './components/user-manager/view-user-manager/view-user-manager.component';
import { EditUserManagerComponent } from './components/user-manager/edit-user-manager/edit-user-manager.component';
import { BrandManagementComponent } from './components/brand-management/brand-management.component';
import { AddressPageComponent } from './components/address-page/address-page.component';



export const routes: Routes = [
    {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
    {path: 'user-cards', component: UserCardsComponent, canActivate: [AuthGuard]},
    {path: '', component: LandingPageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'signin', component: SigninPageComponent},
    {path: 'cart', component: CartPageComponent},
    {path: 'product', component: ProductPageComponent},
    {path: 'payment', component: PaymentPageComponent},
    {path: 'search', component: SearchResultComponent},
    {path: 'category', component: CategoryPageComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'address', component: AddressPageComponent},
    {path: 'create-user-management', component: CreateUserManagerComponent, canActivate: [AuthGuard]},
    {path: 'edit-user-management', component: EditUserManagerComponent, canActivate: [AuthGuard]},
    {path: 'view-user-management', component: ViewUserManagerComponent, canActivate: [AuthGuard]},
    {path: 'product-management', component: ProductManagementComponent, canActivate: [AuthGuard]},
    {path: 'category-management', component: CategoryManagementComponent, canActivate: [AuthGuard]},
    {path: 'brand-management', component: BrandManagementComponent, canActivate: [AuthGuard]}
];
