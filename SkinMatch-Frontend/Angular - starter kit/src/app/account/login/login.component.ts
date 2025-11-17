import { Component, OnInit } from '@angular/core';
import { LUCIDE_ICONS, LucideAngularModule, LucideIconProvider, icons } from 'lucide-angular';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { RecaptchaV3Module, ReCaptchaV3Service } from 'ng-recaptcha';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LucideAngularModule, FormsModule, ReactiveFormsModule,CommonModule,RouterLink, RecaptchaV3Module],
  templateUrl: './login.component.html',
  styles: ``,
  providers: [{ provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider(icons) }]

})
export class LoginComponent implements OnInit {

  constructor( private dd : AuthenticationService ,private router:Router, private recaptchaV3: ReCaptchaV3Service){}
  

  async ngOnInit(): Promise<void> {

  }
togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword; 
  }
  username: string = '';
  password: string = '';
  env = environment;
  NotLoggedIn: boolean = true;
  errorMessage: string = '';
  isLoading: boolean = false;
  realmRoles: string[] = [];
  appRoles: string[] = [];
  showPassword: boolean = false;
  async login1() {
  try {
    const token = await this.recaptchaV3.execute('login').toPromise();
    if (!token) {
      this.errorMessage = 'reCAPTCHA non valide';
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';

    const response = await this.dd.login1(this.username, this.password);
    sessionStorage.setItem('access_token', response.access_token);
    sessionStorage.setItem('refresh_token', response.refresh_token);
    sessionStorage.setItem('NotLoggedIn', 'false');  

    const access_token = sessionStorage.getItem('access_token');
    if (access_token) {
      const decodedToken: any = jwt_decode(access_token);

      // Récupérer l'ID de l'utilisateur
      const userId = decodedToken.sub; 
      console.log('User ID:', userId);
      sessionStorage.setItem('user_id', userId);

      if (decodedToken.archived === 'true') {
        throw new Error('Votre compte est archivé et ne peut pas se connecter.');
      }

      const realmRoles = decodedToken.realm_access.roles;
      const appRoles = decodedToken.resource_access?.backendRH?.roles || [];
      console.log('App roles:', appRoles);
      this.realmRoles = decodedToken.realm_access?.roles || [];
      this.appRoles = this.realmRoles;
      
      console.group('User Roles Information');
      console.log('Full Decoded Token:', decodedToken);
      console.log('User ID:', userId);
      console.log('Realm Roles:', this.realmRoles);
      console.log('Application Roles:', this.appRoles.filter(role => 
          role === 'USER' || role === 'ADMIN'));
      console.groupEnd();

      if (this.appRoles.includes('ADMIN')) {
        this.router.navigate(['']); 
      } else if (this.appRoles.includes('USER')) {
        this.router.navigate(['']).then(() => {
          window.location.reload();  
        });
      }

    }
  } catch (error) {
    this.errorMessage = "Nom d'utilisateur ou mot de passe invalide";
    console.error(error);
  } finally {
    this.isLoading = false;
  }
}
}
function jwt_decode(token: string): any {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);

}
