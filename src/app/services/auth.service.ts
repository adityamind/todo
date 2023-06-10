import { Injectable }               from '@angular/core';
import {AngularFireAuth}            from'@angular/fire/compat/auth'
import { Router }                   from '@angular/router';
import {GoogleAuthProvider}         from '@angular/fire/auth'
import { DataService } from './data.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor(private fireauth:AngularFireAuth,private router:Router,private service:DataService) { }

  isUserLoggedIn()  {
    let resume=localStorage.getItem('todo');
    if(resume!==null) {
      return true;
    }
    else {
      return false;
    }
  }

  login(email:string, password:string){
    this.service.showLoader(true);
    this.fireauth.signInWithEmailAndPassword(email,password).then((res)=>{
      if(res.user?.emailVerified==true) {
        localStorage.setItem('todo',JSON.stringify(email));
        this.router.navigate(['/home']);
      }
      else {
      this.router.navigate(['/user/verify_email']);
    }
    this.service.showLoader(false);
    },err=> {
      alert('something went wrong');
      this.router.navigate(['/user/signin']);
      this.service.showLoader(false);

    })
  }

  register(email:string,password:string){
    this.service.showLoader(true);
    this.fireauth.createUserWithEmailAndPassword(email,password).then(res=>{
      alert('registration succesfull');
      this.sendEmailForVerification(res.user);
      if(res.user?.emailVerified==true) {
        localStorage.setItem('todo',JSON.stringify(email));
        this.router.navigate(['/home']);
        this.service.showLoader(false);
      }
      else {
      this.router.navigate(['/user/verify_email']);
    }
    this.service.showLoader(false);
    },err=>{
      alert(err.message);
      this.router.navigate(['/user/signup']);
      this.service.showLoader(false);
    })

  }


  logOut(){
    this.service.showLoader(true);
    this.fireauth.signOut().then(()=>{
      localStorage.removeItem('todo');
      this.router.navigate(['/user/signin']);
      this.service.showLoader(false);
    },err=>{
      alert(err.message);
      this.service.showLoader(false);

    })
  }

  forgotPassword(email:string) {
    this.fireauth.sendPasswordResetEmail(email).then(()=>{
      this.router.navigate(['/user/verify_email']);

    },err=>{
      alert('something went wrong');
    })
  }

  sendEmailForVerification(user:any){
    user.sendEmailVerification().then((res:any)=>{
      this.router.navigate(['/user/verify_email']);
    },
    (err:any)=>{
      alert('something went wrong');
    })
  }

  googleSignIn(){
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then((res)=>{
      localStorage.setItem('todo',JSON.stringify(res.user?.email));
      this.router.navigate(['/home']);
    },
    err=>{
      alert(err.message);
    })
  }
}
