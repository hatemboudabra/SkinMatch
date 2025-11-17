import { Route, Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout/layout.component';



import { LogoutBasicComponent } from './account/auth/logout/logout-basic/logout-basic.component';



import { ComingSoonComponent } from './extrapages/coming-soon/coming-soon.component';
import { MaintenanceComponent } from './extrapages/maintenance/maintenance.component';
import { Error404Component } from './extrapages/error404/error404.component';
import { OfflineComponent } from './extrapages/offline/offline.component';
import { OnepageLandingComponent } from './landing/onepage-landing/onepage-landing.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { EditProfileComponent } from './account/edit-profile/edit-profile.component';
import { ProductComponent } from './pages/product/product.component';

export const routes: Routes = [

    { 
        path: '', 
        component: LayoutComponent, 
        loadChildren: () => import('./pages/pages.route').then(mod => mod.PAGE_ROUTES), 
        canActivate: [AuthGuard] 
    },
    { path: 'account-login', component: LoginComponent },
    { path: '', redirectTo: 'product', pathMatch: 'full' },
    { path: 'account-register', component: RegisterComponent }, 
     {path:'product', component:ProductComponent},

    // Account/Profile

     //
     
   { path: 'logout', component: LogoutBasicComponent },



    // { path: 'auth-login-cover', component: LoginCoverComponent },
    // { path: 'auth-login-boxed', component: LoginBoxedComponent },
    // { path: 'auth-login-modern', component: LoginModernComponent },

    // { path: 'auth-register-basic', component: RegisterBasicComponent },
    // { path: 'auth-register-cover', component: RegisterCoverComponent },
    // { path: 'auth-register-boxed', component: RegisterBoxedComponent },
    // { path: 'auth-register-modern', component: RegisterModernComponent },

    // { path: 'auth-verify-email-basic', component: VerifyEmailBasicComponent },
    // { path: 'auth-verify-email-cover', component: VerifyEmailCoverComponent },
    // { path: 'auth-verify-email-modern', component: VerifyEmailModernComponent },

    // { path: 'auth-two-steps-basic', component: TwostepBasicComponent },
    // { path: 'auth-two-steps-cover', component: TwostepCoverComponent },
    // { path: 'auth-two-steps-boxed', component: TwostepBoxedComponent },
    // { path: 'auth-two-steps-modern', component: TwostepModernComponent },

    // { path: 'auth-logout-basic', component: LogoutBasicComponent },
    // { path: 'auth-logout-cover', component: LogoutCoverComponent },
    // { path: 'auth-logout-boxed', component: LogoutBoxedComponent },
    // { path: 'auth-logout-modern', component: LogoutModernComponent },

    // { path: 'auth-reset-password-basic', component: ResetPassBasicComponent },
    // { path: 'auth-reset-password-cover', component: ResetPassCoverComponent },
    // { path: 'auth-reset-password-boxed', component: ResetPassBoxedComponent },
    // { path: 'auth-reset-password-modern', component: ResetPassModernComponent },

    // { path: 'auth-create-password-basic', component: CreatePassBasicComponent },
    // { path: 'auth-create-password-cover', component: CreatePassCoverComponent },
    // { path: 'auth-create-password-boxed', component: CreatePassBoxedComponent },
    // { path: 'auth-create-password-modern', component: CreatePassModernComponent },


    // Landing Pages
 // { path: 'onepage-landing', component: OnepageLandingComponent },
  //  { path: 'product-landing', component: ProductLandingComponent },



    // extrapages
//  { path: 'pages-coming-soon', component: ComingSoonComponent },
//  { path: 'pages-maintenance', component: MaintenanceComponent },
//  { path: 'pages-404', component: Error404Component },
//  { path: 'pages-offline', component: OfflineComponent },

];


