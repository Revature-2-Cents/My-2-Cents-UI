import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountTypes, NewAccount } from '../account';
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

@Output() accountTypeChange = new EventEmitter<AccountTypes[]>();

@Output() chooseAccountType = new EventEmitter<number>();

  constructor(
    private http: HttpClient,
    private my2centsservice: My2CentsService
  ) { }

  ngOnInit(): void {
    console.log(this.userId);
    this.UpdateAccountTypes();
  }

  UpdateAccountTypes() {
    this.my2centsservice.getAccountTypes().subscribe((data) => {
      this.accountTypes = data;
      this.accountTypeChange.emit(this.accountTypes);
      console.log(this.accountTypes[0].accountTypeId);
    });
  }

  CreateNewAccount(accountTypeId: number) {
    return this.my2centsservice.createNewAccount(this.userId, accountTypeId);
  }

  NewBankAccount(accountTypeId: number) {
    this.CreateNewAccount(+accountTypeId).subscribe(() => {
      this.newAccount[0].userId = this.userId;
      this.newAccount[0].accountTypeId = accountTypeId;
    });
  }

}
