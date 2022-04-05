import { DOCUMENT } from '@angular/common';
import { Component, Inject, Injectable, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { My2CentsService } from '../_services/my2-cents.service';
import { UserProfile } from 'src/app/_models/userprofile';
import { User } from '../_models/User';
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
  @Input() User = <User>{};
  display: string | undefined;
  mydata: any;
  constructor(private my2centsService: My2CentsService) {}

  ngOnInit(): void {}
  bdisable: any = 'false';
  clickme(inputData: UserProfile) {
    inputData.UserID = this.User.userId;
    inputData.email = this.User.email;
    this.mydata = inputData;
    console.log(this.mydata);

    for (let key in this.mydata) {
      console.log(this.mydata[key]);

      if (key == 'SecondaryEmail' && !this.mydata[key].includes('@')) {
        this.display = 'Invaid email address';
      } else if (key == 'WorkPhone' && isNaN(this.mydata[key])) {
        this.display = 'Invaid Work phone number';
      } else if (key == 'Phone' && isNaN(this.mydata[key])) {
        this.display = 'Invaid phone number';
      } else {
        this.display = '';
        this.my2centsService.PostUserAccounts(inputData);
        this.bdisable = 'true';
        break;
      }
    }
  }
}
