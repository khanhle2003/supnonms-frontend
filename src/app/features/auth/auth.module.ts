import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginFormComponent,
    LoginPageComponent,
    AuthRoutingModule,
  ],
  exports: [
    AuthRoutingModule,
  ]
})
export class AuthModule { }