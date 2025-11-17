import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LUCIDE_ICONS, LucideAngularModule, LucideIconProvider, icons } from 'lucide-angular';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

/*export interface UserDTO {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}*/

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [LucideAngularModule, ReactiveFormsModule, FormsModule,RouterLink,CommonModule],
  templateUrl: './register.component.html',
  styles: ``,
  providers: [{ provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider(icons) }]

})
export class RegisterComponent {

  signupForm!: UntypedFormGroup;
  submitted = false;
  successmsg = false;
  error = '';
  year: number = new Date().getFullYear();

  fieldTextType!: boolean;

  constructor(private formBuilder: UntypedFormBuilder, private dd : AuthenticationService ,private router:Router ) { }

  ngOnInit(): void {
 
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      
    });
  }

  get f() { return this.signupForm.controls; }

onSubmit() {
  this.submitted = true;
  if (this.signupForm.invalid) {
    return;
  }

  const registerDto = {
    email: this.f['email'].value,
    username: this.f['username'].value,
    password: this.f['password'].value,
    firstName: this.f['firstName'].value,
    lastName: this.f['lastName'].value,
    phone: this.f['phone'].value
  };

  this.dd.register1(registerDto).subscribe({
    next: (res: HttpResponse<any>) => {
      console.log('Response status:', res.status);
      console.log('Response body:', res.body);

      // Accepter les codes 200 et 201 comme succès
      if (res.status === 200 || res.status === 201) {
        this.successmsg = true;
        this.error = '';
        const message = res.body?.message || 'Utilisateur créé avec succès !';
        alert(message);
        
        // Redirection après succès (optionnel)
        setTimeout(() => {
          this.router.navigate(['/account-login']);
        }, 2000);
      }
    },
    error: (error: HttpErrorResponse) => {
      console.error('Registration failed:', error);
      
      // Gestion des différents types d'erreurs
      if (error.status === 409) {
        this.error = error.error || 'Utilisateur existe déjà.';
      } else if (error.status === 500) {
        this.error = error.error || 'Erreur interne du serveur.';
      } else if (error.status === 0) {
        this.error = 'Erreur de connexion au serveur.';
      } else {
        this.error = error.error || error.message || 'Erreur inconnue.';
      }
      
      this.successmsg = false;
      alert(`Erreur: ${this.error}`);
    }
  });
}



}
