import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountTypes } from '../account';
import { My2CentsService } from '../my2-cents.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
@Input() userId: number = -1;
accountTypes: AccountTypes[] = [];

@Output() accountTypeChange = new EventEmitter<AccountTypes[]>();

@Output() chooseAccountType = new EventEmitter<number>();

  constructor(
    private http: HttpClient,
    private my2centsservice: My2CentsService
  ) { }

  ngOnInit(): void {
    console.log(this.userId);
  }

  UpdateAccountTypes() {
    this.my2centsservice.getAccountTypes().subscribe((data) => {
      this.accountTypes = data;
      this.accountTypeChange.emit(this.accountTypes);
    });
  }

  CreateNewAccount(totalBalance: number, accountType: number, interest: number) {
    return this.my2centsservice.createNewAccount(this.userId, totalBalance, accountType, interest);
  }

}
