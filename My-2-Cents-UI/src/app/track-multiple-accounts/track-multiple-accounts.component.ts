import {
  Component,
  EventEmitter,
  Inject,
  Injectable,
  OnInit,
  Output,
} from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { UserLoginInfo } from '../Login';
import { Account } from '../account';
import { My2CentsService } from '../my2-cents.service';

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
    @Inject(DOCUMENT) private doc: Document,
    private my2centsservice: My2CentsService
  ) {}

  ngOnInit(): void {
    this.GetUserInfo();
    console.log('dashboard ngOnInit gets called!');
    // this.getAccountArray();
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
      this.GetAccountInfo(this.UserLoginInfo.userID);
    });
    // this.UserLoginInfo = this.userloginservice.GetUser();
  }

  nav(button: string) {
    if (button == 'Dashboard') {
      this.viewAccounts = [];
      this.checkingArray = [];
      this.savingArray = [];
      this.investmentArray = [];
      this.GetAccountInfo(this.UserLoginInfo.userID);
    }
    this.NavName = button;
  }

  logout(): void {
    console.log(this.doc.location);
    this.auth.logout({ returnTo: this.doc.location.origin });
    alert('Successful logout!');
  }

  GetAccountInfo(userid: number) {
    console.log(this.UserLoginInfo);
    if (this.auth.user$) {
      this.my2centsservice.getUserAccounts(userid).subscribe((data) => {
        this.viewAccounts = data;
        // console.log('data: ' + this.viewAccounts[0]);
        this.getAccountArray();
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
        console.log('Account type not valid' + this.viewAccounts[i]);
      }
    }
    console.log(this.checkingArray.length);
  }
}
