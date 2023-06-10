import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private authService:AuthService,private dataService:DataService){}
  public profileImage :Boolean = false ;
  public isMobile :Boolean = false ;
  public showOption :Boolean = false ;
  public profileImageAdd :String = "";
  userName ="User";
  email = "";
  phone = "";


  ngOnInit( ){
    this.getUserDetails();
    this.isMobile = window.innerWidth < 768 ? true : false;
  
  }

  onResize(event:any) {
    this.isMobile = event.target.innerWidth < 768 ? true : false;
    this.showOption = false;
  }
  logOut(){
this.authService.logOut();
}

openOption(){
  this.showOption = !this.showOption;
}

updateProfile(){
this.dataService.showUpdate(true);
}

getUserDetails(){
  this.dataService.showLoader(true);
  let email = this.dataService.getEmail();
  this.dataService.getCardDeatils(email).subscribe((res:any)=>{
  this.dataService.showLoader(false);
  let response= res[0]?.payload.doc.data();
  if(response){
  this.userName = response.first_name ? response.first_name +" "+ response.last_name: 'User'; 
  this.email = response.email;
  this.phone = response.mobile || '9999999999';
  this.profileImageAdd = response.other?.length ? response.other[0].image : "";
  this.profileImage = this.profileImageAdd ? true : false;
  }
},(err)=>{
  this.dataService.showLoader(false);
  alert('something went wrong');

})
}
}
