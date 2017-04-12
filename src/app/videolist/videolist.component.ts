import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { VideoListService }from './videolist.service';
import { UserLoginService } from '../userlogin/userlogin.service';
import { DomSanitizer } from '@angular/platform-browser';
import  { VideoList } from './videolist.module';


@Component({
  selector: 'app-videolist',
  templateUrl: './videolist.component.html',
  styleUrls: ['./videolist.component.css']
})
export class VideolistComponent implements OnInit {

  videolist = [];
  firstVideoList = [];
  secondVideoList = [];
  urlext = '';
  videoLength = 0;
  rateArr = new Array(5);

  constructor(private videoListService:VideoListService,private router:Router, private _domSanitizer:DomSanitizer, private userLoginServices:UserLoginService, private videoList:VideoList) {
    this.checkLogin();
    this.viewAllVideos();
  }

  /*View All Videos on Video List Page*/
  viewAllVideos(){
    this.videoListService.getVideoList()
      .subscribe(resProductData => {
      this.videolist = resProductData[Object.keys(resProductData)[1]];
      this.videoLength = this.videolist.length;
      this.urlext = localStorage.getItem('url_ext');
    });
  }

  /*View Average Reting for each Video from the users (By Dividing summation of rates by number of rates)*/
  averagerating(ratings){
      return Math.round(ratings.reduce((pv, cv) => pv+cv, 0)/(ratings.length));
  }

  onSelectFile(url) {
    return this._domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  logoutUser(){
    localStorage.setItem('sessionid','');
    this.userLoginServices.userLogout();
    this.router.navigate(['userlogin']);
  }

  /*Limit Description Characters*/
  shortDesc(desc){
    return desc.length>50 ? desc.substr(0,49)+'...' : this.toString();
  }

  /*Check Login, If user is unauthorized redirect to login page*/
  checkLogin(){
    if(localStorage.getItem('sessionid')==""){
      this.router.navigate(['userlogin']);
    }
  }

  /*Navigate to Video Page*/
  viewVideo(videoObj, i){
    this.videoList.videoObj = {
      "_id":videoObj._id,
      "vname":videoObj.name,
      "vurl":videoObj.url,
      "vdesc":videoObj.description,
      "vrating":videoObj.ratings
    };
    if(this.videolist[i-1]){
      this.videoList.prevVideoObj = this.videolist[i-1];
    }
    if(this.videolist[i+1]){
      this.videoList.nextViedeoObj = this.videolist[i+1];
    }
    this.videoList.index = i;
    this.router.navigate(['video/'+videoObj._id]);
  }


  ngOnInit() {
  }

}
