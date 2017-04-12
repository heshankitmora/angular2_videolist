import { Injectable } from '@angular/core';

@Injectable()
/*Pass Video Object to Video Page*/
export class VideoList{

  public videoObj: any;
  public prevVideoObj:any;
  public nextViedeoObj:any;
  public index:number;

  public constructor() { }

}
