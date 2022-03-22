import { DOCUMENT } from '@angular/common';
import { Component, Inject, Injectable, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { My2CentsService } from '../_services/my2-cents.service';
import { User } from '../_models/User';
import { AccountService } from '../_services/account.service';

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
    public accountService: AccountService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  @Input() userId: number = -1;

  @Input() User = <User>{};
  ngOnInit(): void {
    //console.log(this.userId);
    this.GetUserProfile();
  }
  nav(str: string): void {
    this.forNav = str;
    this.GetUserProfile();
  }

  GetUserProfile() {
    this.my2centsService
      .getUserInfo(this.User.userId)
      .subscribe((data) => {
        this.data = data;
        //console.log(this.data);
      });
  }
}
