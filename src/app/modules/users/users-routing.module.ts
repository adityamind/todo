import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ErrorPageComponent } from '../common/error-page/error-page.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [

  {
    path:'',redirectTo:'signin',
    pathMatch:'full'
  },
  
  {
    path:'signin',
    canActivate:[AuthGuard],
    component:SignInComponent
  },
   
  {
    path:'signup',
    canActivate:[AuthGuard],
    component:SignUpComponent
  },

  {
    path:'forgot_password',
    canActivate:[AuthGuard],
    component:ForgotPasswordComponent
  },

  {
    path:'verify_email',
    canActivate:[AuthGuard],
    component:VerifyEmailComponent
  },

  {
    path:'**',
    component:ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { 
  
}
