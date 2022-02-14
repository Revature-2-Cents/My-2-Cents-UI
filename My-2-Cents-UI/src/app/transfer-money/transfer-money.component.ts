import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Account } from '../account';
import { TransferService } from '../transfer.service';
import { Location } from '@angular/common';
import { My2CentsService } from '../my2-cents.service';


@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.css'],
})
export class TransferMoneyComponent implements OnInit {
  @Input() account: Account[] = [];
  quantityFiller: string = "";

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
    this.quantityFiller = "";
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
          alert("Insufficient Funds for Transfer");
          return false;
        } else {
          this.TransferFunds(+toAccount, +fromAccount, quantity).subscribe(
            (data: number) => {
              // this.http.jsonp;
              console.log(data);
              if (data > 0) {
                this.UpdateAccountList(); // synchronous update account list to dashboard component
                alert('Transaction succeed!');
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
