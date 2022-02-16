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
  display: string | undefined;
  mydata: any;
  constructor(private my2centsService: My2CentsService) {}

  ngOnInit(): void {}

  clickme(inputData: UserProfile) {
    this.mydata = inputData;
    console.log(this.mydata);

    for (let key in this.mydata) {
      console.log(this.mydata[key]);

      if (key == 'SecondaryEmail' && this.mydata[key].includes('@')) {
        this.display = 'Invaid email address';
      } else if (key == 'WorkPhone' && isNaN(this.mydata[key])) {
        this.display = 'Invaid Work phone number';
      } else if (key == 'Phone' && isNaN(this.mydata[key])) {
        this.display = 'Invaid phone number';
      } else {
        this.display = '';
        //inputData.UserID = this.UserLoginInfo.userID;
        this.my2centsService.PostUserAccounts(inputData);
      }
    }
  }
}
