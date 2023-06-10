import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
passwordResetForm :FormGroup;
  constructor(private formBuilder: FormBuilder,private services:AuthService){
    this.passwordResetForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
  }
  emailSubmit(){
    if (this.passwordResetForm.valid) {
      const username = this.passwordResetForm.get('username')?.value;
      this.services.forgotPassword(username);
      console.log(username);
      
    }
  }
}
