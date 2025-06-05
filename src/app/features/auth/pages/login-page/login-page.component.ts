import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginCredentials } from '../../../../types/auth/login-credentials';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    LoginFormComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  handleLoginSubmit(credentials: LoginCredentials): void {
    this.errorMessage = null;
    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/dashboard']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Login failed', error);
        if (error.status === 401) {
          this.errorMessage = 'Tên đăng nhập hoặc mật khẩu không đúng.';
        } else {
          this.errorMessage = 'Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.';
        }
      }
    });
  }
}
