import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Auth Services
import { AuthenticationService } from '../services/auth.service';
import { AuthfakeauthenticationService } from '../services/authfake.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = sessionStorage.getItem('access_token');
        const notLoggedIn = sessionStorage.getItem('NotLoggedIn');
        
        if (token && notLoggedIn === 'false') {
            return true;
        }
        
 this.router.navigate(['/product'], { queryParams: { returnUrl: state.url } });
         return false;
    }
}
