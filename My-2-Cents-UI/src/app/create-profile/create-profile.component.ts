import { DOCUMENT } from '@angular/common';
import { Component, Inject, Injectable, Input, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { UserLoginInfo } from '../Login';
import { My2CentsService } from '../my2-cents.service';
import { UserProfile } from 'src/app/userprofile';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css'],
})
export class CreateProfileComponent implements OnInit {
  public data: any = [];
  inputData: UserProfile = {} as UserProfile;
  @Input() UserLoginInfo = <UserLoginInfo>{};

  constructor(private my2centsService: My2CentsService) {}

  ngOnInit(): void {}

  clickme(inputData: UserProfile) {
    // console.log('it does nothing',inputData.FirstName);
    inputData.UserID = this.UserLoginInfo.userID;
    inputData.email = this.UserLoginInfo.email;
    this.my2centsService.PostUserAccounts(inputData);
  }
}
