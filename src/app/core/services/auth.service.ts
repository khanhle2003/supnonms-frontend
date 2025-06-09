import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthApiService } from '../../apis/auth-api.service';
import { LoginCredentials } from '../../types/auth/login-credentials';
import { User } from '../../types/user/user'; // Import User interface
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private readonly TOKEN_KEY = 'auth_token';

  constructor(
    private authApi: AuthApiService,
    private router: Router
  ) { }

  // Method để kiểm tra token khi ứng dụng khởi động
  checkLoginStatus(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
    
      this.loggedIn.next(true);
 
    } else {
      this.loggedIn.next(false);
      this.currentUserSubject.next(null);
    }
  }

  login(credentials: LoginCredentials): Observable<any> {
    return this.authApi.login(credentials).pipe(
      tap(response => {
        const token = response.token;
        if (token) {
          localStorage.setItem(this.TOKEN_KEY, token);
          this.loggedIn.next(true);
          this.currentUserSubject.next(response.user);
          this.router.navigate(['/dashboard']);
        }
      }),
      catchError(error => {
        this.logout();
        console.error('Login failed in service:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.loggedIn.next(false);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }


                } 