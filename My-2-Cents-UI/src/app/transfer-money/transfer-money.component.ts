import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Account } from '../account';
import { TransferService } from '../transfer.service';

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

  constructor(private transferService: TransferService) {}
  
  CheckFunds(fromAccount: number, toAccount: number, quantity: number) {

    let fromAcc;

    for (let i = 0; i < this.account.length; i++) {
      if (this.account[i].AccountID == fromAccount) {
        fromAcc = this.account[i];
        break;
      }
    }

    if (fromAcc != undefined) {
      if (+fromAcc.TotalBalance < quantity) {
        this.funds = false;
      } else {
        this.TransferFunds(+fromAccount, +toAccount, quantity);
      }
    }
    
  }

  TransferFunds(fromAccount: number, toAccount: number, quantity: number) : void {
    this.transferService.TransferFunds(fromAccount, toAccount, quantity);

  }

  ngOnInit(): void {}
}
