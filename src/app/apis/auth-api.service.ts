import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginCredentials } from '../types/auth/login-credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  login(credentials: LoginCredentials): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

//   register(credentials: RegisterCredentials): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/register`, credentials);
//   }

//   refreshToken(token: string): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/refresh-token`, { token });
//   }

//   logout(): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/logout`, {});
//   }
} 