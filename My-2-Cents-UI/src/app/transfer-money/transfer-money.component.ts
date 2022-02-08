import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Account } from '../account';
// import { TransferService } from '../transfer-service';

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.css'],
})
export class TransferMoneyComponent implements OnInit {
  account: Account[] = [];
  funds: boolean = true;

  @Output() fromAccount = new EventEmitter<string>();
  @Output() toAccount = new EventEmitter<string>();
  @Output() quantity = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}
}
