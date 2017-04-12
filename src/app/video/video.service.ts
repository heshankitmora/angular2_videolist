import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class VideoService{
  rateData;
  constructor(private http:Http){
  }

  /*Send Users Rate for the video to server*/
  userRate(videoId, rate):Observable<any>{
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});

    this.rateData = {"videoId":videoId,"rating":rate};

    //return this.http.post('localhost:3000/video/ratings?sessionId='+localStorage.getItem('sessionid'), this.rateData, options)
    return this.http.post('http://ec2-35-164-39-54.us-west-2.compute.amazonaws.com/video/ratings?sessionId='+localStorage.getItem('sessionid'), this.rateData, options)
      .map((response:Response)=>response.json());

  }

}
