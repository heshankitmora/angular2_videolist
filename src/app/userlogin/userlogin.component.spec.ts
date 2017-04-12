import { async, ComponentFixture, TestBed, it } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserloginComponent } from './userlogin.component';

describe('UserloginComponent', () => {
  let component: UserloginComponent;
  let fixture: ComponentFixture<UserloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserloginComponent ],
      imports:[
        RouterTestingModule.withRoutes([
          { path: 'userlogin', component: UserloginComponent }
        ])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
