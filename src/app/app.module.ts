import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { UserloginComponent } from './userlogin/userlogin.component';
import { UserLoginService } from './userlogin/userlogin.service';
import { VideolistComponent } from './videolist/videolist.component';
import { VideoListService } from './videolist/videolist.service';
import { VideoComponent } from './video/video.component';
import { VideoList } from './videolist/videolist.module';
import { VideoService } from './video/video.service';

const appRoutes: Routes = [
  { path: 'userlogin', component: UserloginComponent },
  { path: '', component: UserloginComponent },
  { path: 'videolist',component: VideolistComponent },
  { path: 'video/:id',component: VideoComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    VideolistComponent,
    UserloginComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserLoginService,VideoListService,VideoList, VideoService],
  bootstrap: [AppComponent]
})

export class AppModule { }
