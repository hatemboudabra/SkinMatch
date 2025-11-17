import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { UserService, UserDTO } from '../../core/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
   imports: [LucideAngularModule, FormsModule, ReactiveFormsModule,CommonModule, HttpClientModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit{
  form!: FormGroup;
  loading = false;
  submitted = false;
  error: string | null = null;
  success = false;
  selectedFile?: File;
  currentUser?: UserDTO;
  photoUrl: string | null = null;
  userDisplayName: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService, public router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });

    this.resolveUserIdAndLoad();
  }

  private resolveUserIdAndLoad() {
    const userId = sessionStorage.getItem('user_id');
    if (userId && /^\d+$/.test(userId)) {
      this.loadUserById(userId);
      return;
    }

    const token = sessionStorage.getItem('access_token');
    if (!token) return;
    const decoded: any = this.jwt_decode(token);
    const username = decoded?.preferred_username || decoded?.name;
    const email = decoded?.email;
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        const match = users.find(u => (u.username && username && u.username.toLowerCase() === String(username).toLowerCase()) || (u.email && email && u.email.toLowerCase() === String(email).toLowerCase()));
        if (match && (match as any).id != null) {
          const numericId = String((match as any).id);
          sessionStorage.setItem('user_id', numericId);
          this.loadUserById(numericId);
        } else {
          this.loading = false;
          this.error = 'Utilisateur introuvable';
        }
      },
      error: () => {
        this.loading = false;
        this.error = 'Erreur lors de la résolution de l\'utilisateur';
      }
    });
  }

  private loadUserById(id: string) {
    this.loading = true;
    this.userService.getUserById(id).subscribe({
      next: (user) => {
        this.currentUser = user;
        this.form.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone || ''
        });
        this.photoUrl = this.userService.getPhotoUrl(user.photo);
        const first = user.firstName || '';
        const last = user.lastName || '';
        const full = `${first} ${last}`.trim();
        this.userDisplayName = full || user.username || user.email || null;
        this.loading = false;
      },
      error: () => {
        this.error = 'Impossible de charger le profil utilisateur';
        this.loading = false;
      }
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  submit() {
    this.submitted = true;
    this.error = null;
    if (this.form.invalid || !this.currentUser) return;
    this.loading = true;
    const userId = sessionStorage.getItem('user_id');
    if (!userId) {
      this.error = 'Utilisateur non connecté';
      this.loading = false;
      return;
    }
    const payload: UserDTO = {
      ...this.currentUser,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      phone: this.form.value.phone,
    };
    this.userService.updateUser(userId, payload, this.selectedFile).subscribe({
      next: (updated) => {
        this.success = true;
        this.currentUser = updated;
        this.photoUrl = this.userService.getPhotoUrl(updated.photo);
        this.loading = false;
        this.router.navigate(['']);
      },
      error: () => {
        this.error = 'La mise à jour du profil a échoué';
        this.loading = false;
      }
    });
  }

  private jwt_decode(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  }

}
