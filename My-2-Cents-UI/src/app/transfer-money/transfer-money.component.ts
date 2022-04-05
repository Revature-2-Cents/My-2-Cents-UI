import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Account } from '../_models/account';
import { TransferService } from '../_services/transfer.service';
import { Location } from '@angular/common';

import { TestBed, async } from '@angular/core/testing';

import { My2CentsService } from '../_services/my2-cents.service';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.css'],
})
export class TransferMoneyComponent implements OnInit {
  @Input() account: Account[] = [];
  quantityFiller: string = '';
  fromaccount: number = -1;
  toaccount: number = -1;

  @Output() accountChange = new EventEmitter<Account[]>();
  @Input() userId: number = -1;

  funds: boolean = true;

  @Output() fromAccount = new EventEmitter<string>();
  @Output() toAccount = new EventEmitter<string>();
  @Output() quantity = new EventEmitter<number>();

  constructor(
    private transferService: TransferService,
    private http: HttpClient,
    private location: Location,
    private my2centsservice: My2CentsService
  ) {}

  ngOnInit(): void {
    console.log(this.account);
    console.log(this.userId);
  }

  ClearQuantity() {
    this.quantityFiller = '';
  }

  CheckFunds(fromAccount: number, toAccount: number): boolean {
    let quantity = +this.quantityFiller;
    this.ClearQuantity();
    console.log(fromAccount + ' ' + toAccount + ' ' + quantity);
    if (fromAccount == 0 || toAccount == 0) {
      alert('Select Accounts to make the transfer');
      return false;
    }
    if (fromAccount == toAccount) {
      alert('Cannot Transfer From and To Same Account');
      return false;
    } else {
      let fromAcc;

      for (let i = 0; i < this.account.length; i++) {
        if (this.account[i].accountID == fromAccount) {
          fromAcc = this.account[i];
          break;
        }
      }

      if (quantity <= 0) {
        alert('Quantity must be above $0');
        return false;
      }

      if (fromAcc != undefined && toAccount != 0) {
        console.log('inbetween ifs');
        if (+fromAcc.totalBalance < quantity) {
          this.funds = false;
          alert('Insufficient Funds for Transfer');
          return false;
        } else {
          this.TransferFunds(+toAccount, +fromAccount, quantity).subscribe(
            (data: number) => {
              // this.http.jsonp;
              console.log(data);
              if (data > 0) {
                this.UpdateAccountList(); // synchronous update account list to dashboard component
                console.log('help', data);
                alert('Transaction succeeded!');
                return true;
              } else {
                alert('Server Error Please Contact the Bank for Assistance');
                return false;
              }
            }
          );
        }
      } else {
        alert('Select an Account to Transfer');
        return false;
      }
    }
    return false;
  }

  UpdateAccountList() {
    this.my2centsservice.getUserAccounts(this.userId).subscribe((data) => {
      // synchronous update account list
      console.log('running emit');
      this.account = data;
      this.accountChange.emit(this.account);
    });
  }

  TransferFunds(fromAccount: number, toAccount: number, quantity: number): any {
    return this.transferService.TransferFunds(fromAccount, toAccount, quantity);
  }
}
