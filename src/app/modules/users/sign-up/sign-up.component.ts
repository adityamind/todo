import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signupForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private services:AuthService) {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required,Validators.minLength(6)])]
    });
  }

  signup() {
    if (this.signupForm.valid) {
      console.log('wihshuj');
      const username = this.signupForm.get('username')?.value;
      const password = this.signupForm.get('password')?.value;
      this.services.register(username,password);
    }
  }
}
