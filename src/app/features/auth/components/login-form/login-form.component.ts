import { Component, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginCredentials } from '../../../../types/auth/login-credentials';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit {
  @Output() loginSubmit = new EventEmitter<LoginCredentials>();

  loginForm!: FormGroup;

  @ViewChild('signUp') signUpButton!: ElementRef;
  @ViewChild('signIn') signInButton!: ElementRef;
  @ViewChild('container') container!: ElementRef;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loginSubmit.emit(this.loginForm.value);
    }
  }

  activateRightPanel(): void {
    if (this.container) {
      this.container.nativeElement.classList.add('right-panel-active');
    }
  }

  deactivateRightPanel(): void {
    if (this.container) {
      this.container.nativeElement.classList.remove('right-panel-active');
    }
  }
}
