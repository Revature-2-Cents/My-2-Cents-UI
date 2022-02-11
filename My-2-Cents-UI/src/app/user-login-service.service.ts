import { Inject, Injectable, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserLoginInfo } from './Login';

@Injectable({
  providedIn: 'root',
})
export class UserLoginServiceService {
  constructor(public auth: AuthService) {}

  UserLoginInfo = <UserLoginInfo>{};
  GetUserInfo() {
    // Getting user infomation after login
    this.auth.user$.subscribe((data) => {
      console.log(data!.sub!.substring(6));
      this.UserLoginInfo.userID = +data!.sub!.substring(6);
      this.UserLoginInfo.userName = data?.nickname;
      this.UserLoginInfo.email = data?.email;
    });
    // return this.UserLoginInfo;
  }
  GetUser() {
    if (this.auth.user$) {
      this.GetUserInfo();
    }
    return this.UserLoginInfo;
  }
}
