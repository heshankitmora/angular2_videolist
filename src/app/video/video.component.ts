import { Component, OnInit, ViewChildren } from '@angular/core';
import { Router } from "@angular/router";
import { UserLoginService } from '../userlogin/userlogin.service';
import  { VideoList } from '../videolist/videolist.module';
import { VideoService } from './video.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  videoId;
  videoName;
  videoDesc;
  videoRate;
  videoUrl;
  urlext;
  prevVideo;
  nextVideo;
  index;
  rateArr = new Array(5);
  rateStatus = "";

  /*For Style Rate Element and Get The Element*/
  @ViewChildren('rateElements') rateEles;

  constructor(private router:Router, private userLoginServices:UserLoginService, private videoList:VideoList, private videoService:VideoService) {
    this.checkLogin();

    /*Passing data by assigning value by value to the view*/
    this.videoId = this.videoList.videoObj._id;
    this.videoName = this.videoList.videoObj.vname;
    this.videoUrl = this.videoList.videoObj.vurl;
    this.videoDesc = this.videoList.videoObj.vdesc;
    this.videoRate = Math.round(this.videoList.videoObj.vrating.reduce((pv, cv) => pv+cv, 0)/(this.videoList.videoObj.vrating.length));
    this.urlext = localStorage.getItem('url_ext');


    this.index = this.videoList.index;

    /*Passing data with whole object to the view*/
    /*Previous Video That listed before current Video*/
    this.prevVideo = this.videoList.prevVideoObj;

    /*Next Video that listed after the current video*/
    this.nextVideo = this.videoList.nextViedeoObj;
  }

  /*Check Login, If user is unauthorized redirect to login page*/
  checkLogin(){
    if(localStorage.getItem('sessionid')==""){
      this.router.navigate(['userlogin']);
    }
  }

  /*View Previous or Next Video*/
  viewVideo(videoObj){
    /*Passing data by assigning value by value to the view*/
    this.videoId = videoObj._id;
    this.videoName = videoObj.name;
    this.videoUrl = videoObj.url;
    this.videoDesc = videoObj.description;
    this.videoRate = videoObj.ratings;
    this.urlext = localStorage.getItem('url_ext');

    this.router.navigate(['video/'+videoObj._id]);
  }

  /*Logout user and navigate back to login screen*/
  logoutUser(){
    localStorage.setItem('sessionid','');
    this.userLoginServices.userLogout();
    this.router.navigate(['userlogin']);
  }

  /*Navigate Backto Video List*/
  backToList(){
    this.router.navigate(['videolist']);
  }


  /*Use for Send Ratings of the user to the Rating Service*/
  rateVideo(videoId,rateOrg){
    let rate = rateOrg+1;

    this.videoService.userRate(videoId, rate).subscribe(
      response => {
        if(response.status == "success"){
            this.rateStatus = "You have rated successfully";
        }

      },
      err => console.log('error', err)
    );

  }

  /*highlight rates for users mouse hover*/
  highLighted(event, index){
    this.rateEles.toArray().slice(0,index+1).forEach(function(elem){
      elem.nativeElement.classList.add('highlight')
    });
  }

  highLightedRemove(event, index){
    this.rateEles.toArray().forEach(function(elem){
      elem.nativeElement.classList.remove('highlight')
    });
  }

  ngOnInit() {
  }

}
