import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Account } from '../account';
import { TransferService } from '../transfer.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.css'],
})
export class TransferMoneyComponent implements OnInit {
  @Input() account: Account[] = [];

  funds: boolean = true;

  @Output() fromAccount = new EventEmitter<string>();
  @Output() toAccount = new EventEmitter<string>();
  @Output() quantity = new EventEmitter<number>();

  constructor(
    private transferService: TransferService,
    private http: HttpClient,
    private location: Location
  ) {}

  ngOnInit(): void {
    console.log(this.account);
  }

  CheckFunds(
    fromAccount: number,
    toAccount: number,
    quantity: number
  ): boolean {
    console.log(fromAccount + ' ' + toAccount + ' ' + quantity);
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

      if (fromAcc != undefined) {
        if (+fromAcc.totalBalance < quantity) {
          this.funds = false;
          return false;
        } else {
          this.TransferFunds(+fromAccount, +toAccount, quantity).subscribe(
            (response: { status: any; body: number }) => {
              this.http.jsonp;
              console.log(response.status);
              if (response.body > 0) {
                this.location.back();
                return true;
              } else {
                alert('Server Error Please Contact the Bank for Assistance');
                return false;
              }
            }
          );
        }
      }
    }

    return false;
  }

  TransferFunds(fromAccount: number, toAccount: number, quantity: number): any {
    return this.transferService.TransferFunds(fromAccount, toAccount, quantity);
  }
}
