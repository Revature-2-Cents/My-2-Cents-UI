import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { UserLoginInfo } from '../Login';
import { Account } from '../account';
import { ThisReceiver } from '@angular/compiler';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-track-multiple-accounts',
  templateUrl: './track-multiple-accounts.component.html',
  styleUrls: ['./track-multiple-accounts.component.css'],
})
export class TrackMultipleAccountsComponent implements OnInit {
  viewAccounts: Account[] = [];
  checkingArray: Account[] = [];
  savingArray: Account[] = [];
  investmentArray: Account[] = [];

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnInit(): void {
    this.GetUserInfo();
    this.getAccountArray();
  }
  UserLoginInfo = <UserLoginInfo>{};
  NavName: string = 'dashboard';
  GetUserInfo() {
    // Getting user infomation after login
    this.auth.user$.subscribe((data) => {
      console.log(data!.sub!.substring(6));
      this.UserLoginInfo.userID = +data!.sub!.substring(6);
      this.UserLoginInfo.userName = data?.nickname;
      this.UserLoginInfo.email = data?.email;
    });
  }

  logout(): void {
    console.log(this.doc.location);
    this.auth.logout({ returnTo: this.doc.location.origin });
    alert('Successfully logout!');
  }

  getAccountArray(): void {
    for (let i = 0; i < this.viewAccounts.length; i++) {
      if (this.viewAccounts[i].AccountType == 'Checking') {
        this.checkingArray.push(this.viewAccounts[i]);
      } else if (this.viewAccounts[i].AccountType == 'Savings') {
        this.savingArray.push(this.viewAccounts[i]);
      } else if (this.viewAccounts[i].AccountType == 'Investment') {
        this.investmentArray.push(this.viewAccounts[i]);
      } else {
        console.log('Account type not valid' + this.viewAccounts[i]);
      }
    }
  }
}
