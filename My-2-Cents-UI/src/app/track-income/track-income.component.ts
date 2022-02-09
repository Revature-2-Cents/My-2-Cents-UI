import { Component, OnInit } from '@angular/core';
import { Expenses, Mock_Items } from '../mock-incomes'

import { IncomesService } from '../incomes.service';

@Component({
  selector: 'app-track-income',
  templateUrl: './track-income.component.html',
  styleUrls: ['./track-income.component.css']
})
export class TrackIncomeComponent implements OnInit {

  Items : Expenses[] = Mock_Items;

  selectedItem?: Expenses;

  testHttp = this.iService.getAccountInfo();
  constructor(private iService : IncomesService) { }

  ngOnInit(){
  }

  selectItem(Item: Expenses): void {
    if(this.selectedItem === Item){
      this.selectedItem = undefined;
    }
    else{
      this.selectedItem = Item;
    }
  }

  test()
  {

  }
}
