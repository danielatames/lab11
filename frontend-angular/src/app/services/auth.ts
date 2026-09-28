import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthResponse } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  login(username: string, password: string) {
    return this.http.post<AuthResponse>(`${environment.API_URL}/auth/login`, { username, password })
      .pipe(tap(res => {
        sessionStorage.setItem('jwt_token', res.token);
        sessionStorage.setItem('jwt_username', res.username);
        sessionStorage.setItem('jwt_roles', JSON.stringify(res.roles));
      }));
  }

  logout() {
    sessionStorage.removeItem('jwt_token');
    sessionStorage.removeItem('jwt_username');
    sessionStorage.removeItem('jwt_roles');
  }

  getToken(): string | null { return sessionStorage.getItem('jwt_token'); }
  isLoggedIn(): boolean { return !!this.getToken(); }
  getRoles(): string[] { return JSON.parse(sessionStorage.getItem('jwt_roles') || '[]'); }
  hasRole(rol: string): boolean { return this.getRoles().includes(rol); }
}