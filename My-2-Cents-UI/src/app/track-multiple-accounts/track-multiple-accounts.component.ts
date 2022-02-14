import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { UserLoginInfo } from '../Login';
import { Account } from '../account';
import { ThisReceiver } from '@angular/compiler';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { UserLoginServiceService } from '../user-login-service.service';
import { My2CentsService } from '../my2-cents.service';
import { CreateProfileComponent } from '../create-profile/create-profile.component';

@Component({
  selector: 'app-track-multiple-accounts',
  templateUrl: './track-multiple-accounts.component.html',
  styleUrls: ['./track-multiple-accounts.component.css'],
})
export class TrackMultipleAccountsComponent implements OnInit {
  public account: Account[] = [];
  viewAccounts: Account[] = [];
  checkingArray: Account[] = [];
  savingArray: Account[] = [];
  investmentArray: Account[] = [];
  b: any;

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,
    private userloginservice: UserLoginServiceService,
    private my2centsservice: My2CentsService
  ) {}

  ngOnInit(): void {
    this.GetUserInfo();
    this.GetAccountInfo();
    this.getAccountArray();
  }

  UserLoginInfo = <UserLoginInfo>{};
  NavName: string = 'Dashboard';
  GetUserInfo() {
    // Getting user infomation after login
    this.auth.user$.subscribe((data) => {
      console.log(data!.sub!.substring(6));
      this.UserLoginInfo.userID = +data!.sub!.substring(6);
      this.UserLoginInfo.userName = data?.nickname;
      this.UserLoginInfo.email = data?.email;
    });
    // this.UserLoginInfo = this.userloginservice.GetUser();
  }
nav(button: string) {
    this.NavName = button;
  }

  logout(): void {
    console.log(this.doc.location);
    this.auth.logout({ returnTo: this.doc.location.origin });
    alert('Successfully logout!');
  }

  GetAccountInfo() {
    if (this.auth.user$) {
      this.my2centsservice.getUserAccounts(this.UserLoginInfo.userID).subscribe((account) => {
        var a = JSON.stringify(account[0]);
        console.log(a);
        this.b = JSON.parse(a);
        console.log(this.b.accountType);
        this.account = account;
        console.log(account.length + " length");
      });
    }
  }

  getAccountArray(): void {

    for (let i = 0; i < this.viewAccounts.length; i++) {
      if (this.viewAccounts[i].accountType == 'Checking') {
        console.log('checking account added');
        this.checkingArray.push(this.viewAccounts[i]);
      } else if (this.viewAccounts[i].accountType == 'Savings') {
        this.savingArray.push(this.viewAccounts[i]);
      } else if (this.viewAccounts[i].accountType == 'Investment') {
        this.investmentArray.push(this.viewAccounts[i]);

      } else {
        console.log('Account type not valid' + this.b);
      }
    }
    console.log(this.checkingArray.length);
  }
}
