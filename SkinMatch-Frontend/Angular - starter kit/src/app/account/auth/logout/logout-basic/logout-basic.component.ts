import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LUCIDE_ICONS, LucideAngularModule, LucideIconProvider, icons } from 'lucide-angular';
import { AuthenticationService } from '../../../../core/services/auth.service';
import { environment } from '../../../../../environments/environment';
import { AuthfakeauthenticationService } from '../../../../core/services/authfake.service';

@Component({
  selector: 'app-logout-basic',
  standalone: true,
  imports: [RouterModule,LucideAngularModule],
  templateUrl: './logout-basic.component.html',
  styles: ``,
  providers:[{provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider(icons)}]
})
export class LogoutBasicComponent {

constructor(private router: Router, private authService: AuthenticationService, ) {}
 logout(): void {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('user_id');
    sessionStorage.setItem('NotLoggedIn', 'true');
    this.authService.logout1();
     this.router.navigate(['/account-login']);
}}