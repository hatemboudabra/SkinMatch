import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserDTO {
  id?: number;
  username?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  photo?: string;
}


@Injectable({ providedIn: 'root' })
export class UserService {
private ApiUrl= 'http://localhost:9092/user/users'
    constructor(private http: HttpClient) { }

    getUsers(): Observable<UserDTO[]> {
        return this.http.get<UserDTO[]>(`${this.ApiUrl}/alluser`);
    }

    getUserById(id: string | number): Observable<UserDTO> {
        return this.http.get<UserDTO>(`${this.ApiUrl}/user/${id}`);
    }

    updateUser(id: string | number, user: UserDTO, file?: File): Observable<UserDTO> {
        const formData = new FormData();
        const userBlob = new Blob([JSON.stringify(user)], { type: 'application/json' });
        formData.append('user', userBlob);
        if (file) {
            formData.append('file', file);
        }
        return this.http.put<UserDTO>(`${this.ApiUrl}/updateUser/${id}`, formData);
    }

    getPhotoUrl(fileName: string | undefined): string | null {
        if (!fileName) return null;
        return `${this.ApiUrl}/photo/${fileName}`;
    }
  
}
