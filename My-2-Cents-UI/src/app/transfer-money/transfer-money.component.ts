import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Account } from '../account';
import { TransferService } from '../transfer-service';

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.css']
})
export class TransferMoneyComponent implements OnInit {

  accounts: Account[] = [];
  funds: boolean = true;

  @Output() fromAccount = new EventEmitter<string>();
  @Output() toAccount = new EventEmitter<string>();
  @Output() quantity = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  CheckFunds(fromAccount: number, toAccount: number, quantity: number) {
    
    if (+this.accounts[+fromAccount].TotalBalance < quantity) {
      this.funds = false;
    } else {
      this.TransferFunds(+fromAccount, +toAccount, quantity);
    }
  }

  TransferFunds(fromAccount: number, toAccount: number, quantity: number) : void {
    this.transactionService.TransferFunds(fromAccount, toAccount, quantity);

  }

}