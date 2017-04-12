import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from './userlogin.module';
import { UserLoginService } from './userlogin.service';
import { Http, Response } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { VideolistComponent } from '../videolist/videolist.component';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css'],

})
export class UserloginComponent implements OnInit {

  constructor(private userLoginService:UserLoginService, private router:Router) { }

  loginStatus:'0';
  loginStatusMsg='';

  userSubmitLogin(form: NgForm){
    var _validStatus:number = 0;
    this.userLoginService.userLoginForm(this.model).subscribe(
      response => {
        if(response.status == "success"){
          localStorage.setItem('sessionid',response.sessionId);
          localStorage.setItem('url_ext','http://ec2-35-164-39-54.us-west-2.compute.amazonaws.com/')
          _validStatus = 1;
          console.log('success', response);
          this.redirectVideoList();
          this.loginStatusMsg = 'Logged into the system successfully';
        }
        else{
          this.loginStatusMsg = 'Login Details are incorrect, please try again';
        }

      },
      err => console.log('error', err)
    );
  }

  private redirectVideoList():void{
    this.router.navigate(['videolist']);
  }

  model = new User('','');

  ngOnInit() {
  }

}
