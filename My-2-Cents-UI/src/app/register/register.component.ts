import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Account, AccountTypes, NewAccount } from '../account';
import { My2CentsService } from '../my2-cents.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
@Input() userId: number = -1;
accountTypes: AccountTypes[] = [];
newAccount: NewAccount[] = [];
viewAccounts: Account[] = [];

@Output() accountTypeChange = new EventEmitter<AccountTypes[]>();

@Output() chooseAccountType = new EventEmitter<number>();

  constructor(
    private my2centsservice: My2CentsService
  ) { }

  ngOnInit(): void {
    console.log(this.userId);
    this.GetAccountTypes();
  }

  GetAccountTypes() {
    this.my2centsservice.getAccountTypes().subscribe((data) => {
      this.accountTypes = data;
      this.accountTypeChange.emit(this.accountTypes);
    });
  }

  CreateNewAccount(accountTypeId: number) {
    return this.my2centsservice.createNewAccount(this.userId, accountTypeId);
  }

  NewBankAccount(accountTypeId: number) {
    this.CreateNewAccount(+accountTypeId).subscribe();
    alert('Account Created!');
    this.GetAccountTypes();
  }
}
