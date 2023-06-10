import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule ,FormsModule}      from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { HomeGuard } from 'src/app/guards/home.guard';


@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ],
  exports:[
    SignInComponent,
    SignUpComponent,
    VerifyEmailComponent
  ],
  providers: [AuthGuard,HomeGuard],
})
export class UsersModule { }
