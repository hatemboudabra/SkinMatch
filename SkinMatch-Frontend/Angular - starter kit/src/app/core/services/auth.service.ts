import { Injectable } from '@angular/core';
import { Observable, catchError, from, map, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import axios from 'axios';
import Swal from 'sweetalert2';
import { User, UserDTO } from '../../data/users.models';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {
  constructor(private http: HttpClient) {
    }


 private keycloakUrl = 'http://localhost:8089/realms/SkinMatch/protocol/openid-connect';
     async login1(username: string, password: string): Promise<any> {
      const data = new URLSearchParams();
      data.append('grant_type', 'password');
      data.append('client_id', 'SkinMatchFrontend');
      data.append('client_secret', 'wDdGsGFGHrIPrdcrlxb7Vb2pcFjani5A');
      data.append('username', username);
      data.append('password', password);

      try {
    const response = await axios.post(`${this.keycloakUrl}/token`, data);
          const { access_token, refresh_token } = response.data;

          sessionStorage.setItem('access_token', access_token);
          sessionStorage.setItem('refresh_token', refresh_token);


                   return response.data;
      } catch (error) {
          if (axios.isAxiosError(error)) {
              // Afficher une alerte si le compte est archivé
              if (error.message.includes('Votre compte est archivé')) {
                  Swal.fire({
                      title: 'Compte archivé',
                      text: 'Votre compte est archivé et ne peut pas se connecter.',
                      icon: 'warning',
                      confirmButtonText: 'OK'
                  });
              } else {
                           }
          }
          throw error;
      }
    }
    async logout1(): Promise<void> {
    try {
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
        
        const logoutUrl = `${this.keycloakUrl}/logout?client_id=SkinMatchFrontend&post_logout_redirect_uri=${encodeURIComponent(window.location.origin)}`;
        window.location.href = logoutUrl;
    } catch (error) {
        console.error('Logout failed:', error);
        throw error;
    }
}

isAuthenticated(): boolean {
    return !!sessionStorage.getItem('access_token');
}

apiUrl: string = 'http://localhost:9092/user/users';
register1(user: UserDTO): Observable<HttpResponse<any>> {
  return this.http.post<any>(`${this.apiUrl}/register`, user, {
    observe: 'response'
  }).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Registration error:', error);
      return throwError(error);
    })
  );
}
async getCurrentUser(): Promise<any> {
  const accessToken = sessionStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('No access token found');
  }
  try {
    const response = await axios.get(`${this.keycloakUrl}/userinfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting current user', error);
    throw error;
  }
}




}

