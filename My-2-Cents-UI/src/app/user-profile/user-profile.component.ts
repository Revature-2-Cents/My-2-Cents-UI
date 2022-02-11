import { DOCUMENT } from '@angular/common';
import { Component, Inject, Injectable, Input, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { UserLoginInfo } from '../Login';
import { My2CentsService } from '../my2-cents.service';
import { UserLoginServiceService } from '../user-login-service.service';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  //title = 'image-gallery';
  public data: any = [];
  constructor(
    private http: HttpClient,
    private my2centsService: My2CentsService,
    public auth: AuthService,
    private userloginservice: UserLoginServiceService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  UserLoginInfo = <UserLoginInfo>{};
  ngOnInit(): void {
    this.GetUserInfo();
    // this.getData();
    this.GetUserProfile();
  }

  GetUserInfo() {
    this.UserLoginInfo = this.userloginservice.GetUser();
  }

  // UserLoginInfo = <UserLoginInfo>{};

  // GetUserInfo() {
  //   // Getting user infomation after login
  //   this.auth.user$.subscribe((data) => {
  //     console.log(data!.sub!.substring(6));
  //     this.UserLoginInfo.userID = +data!.sub!.substring(6);
  //   });
  // }

  GetUserProfile() {
    if (this.auth.user$) {
      this.my2centsService
        .getUserInfo(this.UserLoginInfo.userID)
        .subscribe((data) => {
          this.data = data;
        });
    }
  }
  // getData() {
  //   //const url ='https://my2centsapi.azurewebsites.net/api/User/Info?userid=19'
  //   const url = `https://my2centsapi.azurewebsites.net/api/User/Info?UserId=${this.userId}`;
  //   // + this.UserLoginInfo.userID;
  //   console.log(this.UserLoginInfo.userID);
  //   this.http.get(url).subscribe((res) => {
  //     this.data = res;
  //     console.log(this.data);
  //   });
  // }
}
