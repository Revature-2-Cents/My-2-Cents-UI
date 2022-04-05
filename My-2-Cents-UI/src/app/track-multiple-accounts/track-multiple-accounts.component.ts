import {
  Component,
  EventEmitter,
  Inject,
  Injectable,
  OnInit,
  Output,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { take } from 'rxjs/operators';
import { Account, AccountTypes, NewAccount } from '../_models/account';
import { My2CentsService } from '../_services/my2-cents.service';
import { User } from '../_models/User';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DarkModeService } from 'angular-dark-mode';

@Component({
  selector: 'app-track-multiple-accounts',
  templateUrl: './track-multiple-accounts.component.html',
  styleUrls: ['./track-multiple-accounts.component.css'],
})
export class TrackMultipleAccountsComponent implements OnInit {

  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;

  viewAccounts: Account[] = [];
  checkingArray: Account[] = [];
  savingArray: Account[] = [];
  investmentArray: Account[] = [];

  accountTypes: AccountTypes[] = [];
  newAccount: NewAccount[] = [];

  User = <User>{};

  @Output() accountTypeChange = new EventEmitter<AccountTypes[]>();
  @Output() chooseAccountType = new EventEmitter<number>();
  @Output() getAccounts = new EventEmitter<Account[]>();

  constructor(
    // public auth: AuthService,
    public accountService: AccountService,
    private router: Router,
    @Inject(DOCUMENT) private doc: Document,
    private my2centsservice: My2CentsService,
    private darkModeService: DarkModeService
  ) {}

  ngOnInit(): void {
    this.accountService.currentUser.pipe(take(1)).subscribe((data) => this.User = data);
    this.GetUserInfo();
    this.GetAccountTypes();
    console.log('dashboard ngOnInit gets called!');
    // this.getAccountArray();
  }

  NavName: string = 'Dashboard';
  GetUserInfo() {
    // Getting user infomation after login
    this.GetAccountInfo(this.User.userId);
  }

  onToggle(): void {
    this.darkModeService.toggle();
  }

  nav(button: string) {
    if (button == 'Dashboard') {
      this.viewAccounts = [];
      this.checkingArray = [];
      this.savingArray = [];
      this.investmentArray = [];
      this.GetAccountInfo(this.User.userId);
    }
    this.NavName = button;
  }

  logout(): void {
    console.log(this.doc.location);
    this.accountService.logout();
    this.router.navigateByUrl('/');
    alert('Successful logout!');
  }

  GetAccountInfo(userid: number) {
    console.log(this.User);
    this.my2centsservice.getUserAccounts(userid).subscribe((data) => {
      this.viewAccounts = data;
      // console.log('data: ' + this.viewAccounts[0]);
      this.getAccountArray();
    });
  }

  GetAccountTypes() {
    this.my2centsservice.getAccountTypes().subscribe((data) => {
      this.accountTypes = data;
      this.accountTypeChange.emit(this.accountTypes);
    });
  }

  CreateNewAccount(accountTypeId: number) {
    return this.my2centsservice.createNewAccount(
      this.User.userId,
      accountTypeId
    );
  }

  UpdateAccountInfo(userid: number) {
    this.viewAccounts = [];
    this.checkingArray = [];
    this.savingArray = [];
    this.investmentArray = [];
    this.my2centsservice.getUserAccounts(userid).subscribe((data) => {
      this.viewAccounts = data;
      this.getAccountArray();
      this.getAccounts.emit(this.viewAccounts);
    });
  }

  NewBankAccount(accountTypeId: number) {
    this.CreateNewAccount(+accountTypeId).subscribe();
    alert('Account Created!');
    this.GetAccountTypes();
    this.viewAccounts = [];
    this.UpdateAccountInfo(this.User.userId);
  }

  getAccountArray(): void {
    if (this.viewAccounts) {
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
}
