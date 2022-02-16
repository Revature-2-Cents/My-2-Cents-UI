import { DOCUMENT } from '@angular/common';
import { Component, Inject, Injectable, Input, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { UserLoginInfo } from '../Login';
import { My2CentsService } from '../my2-cents.service';

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
  public forNav: string = 'Profile';
  public data: any = [];
  constructor(
    private http: HttpClient,
    private my2centsService: My2CentsService,
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  @Input() userId: number = -1;

  @Input() UserLoginInfo = <UserLoginInfo>{};
  ngOnInit(): void {
    //console.log(this.userId);
    this.GetUserProfile();
  }
  nav(str: string): void {
    this.forNav = str;
    this.GetUserProfile();
  }

  GetUserProfile() {
    if (this.auth.user$) {
      this.my2centsService
        .getUserInfo(this.UserLoginInfo.userID)
        .subscribe((data) => {
          this.data = data;
          //console.log(this.data);
        });
    }
  }
}
