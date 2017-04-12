import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response, Headers, RequestOptions } from '@angular/http';
import { User } from './userlogin.module';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class UserLoginService{
    constructor(private http:Http){
    }

    private getData(res: Response){
      let data = res.json();
      return data.fields || {};
    }


    /*Authenticate user from backend*/
    userLoginForm(user:User):Observable<any>{

        let userData = JSON.stringify(user);
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});

      /*You can use both services since i have hosted node server on AWS Server*/
      //return this.http.post('localhost:3000/user/auth', userData, options)
      return this.http.post('http://ec2-35-164-39-54.us-west-2.compute.amazonaws.com/user/auth', userData, options)
        .map((response:Response)=>response.json());

    }

    /*Logout User from Backend*/
    userLogout():Observable<any>{
      //return this.http.get('localhost:3000/user/logout')
      return this.http.get('http://ec2-35-164-39-54.us-west-2.compute.amazonaws.com/user/logout')
        .map((response:Response)=>response.json());
    }
}
