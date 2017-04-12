import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response, Headers, RequestOptions } from '@angular/http';
import { VideoList } from './videolist.module';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class VideoListService{

  private _videourl:string = 'http://ec2-35-164-39-54.us-west-2.compute.amazonaws.com/videos?sessionId='+localStorage.getItem('sessionid')+'&limit=10';

  constructor(private http:Http){
  }

  getVideoList(){
    //this._videourl = 'localhost:3000/videos?sessionId='+localStorage.getItem('sessionid');
    this._videourl = 'http://ec2-35-164-39-54.us-west-2.compute.amazonaws.com/videos?sessionId='+localStorage.getItem('sessionid')+'&limit=10';
    return this.http.get(this._videourl)
      .map((response:Response) => response.json());
  }

}
