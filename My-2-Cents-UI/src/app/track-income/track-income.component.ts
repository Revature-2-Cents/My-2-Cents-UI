import { Component, OnInit } from '@angular/core';
import { Expenses, Mock_Items } from '../mock-incomes'

import { IncomesService } from '../incomes.service';

@Component({
  selector: 'app-track-income',
  templateUrl: './track-income.component.html',
  styleUrls: ['./track-income.component.css']
})
export class TrackIncomeComponent implements OnInit {

  //Items : Expenses[] = Mock_Items;

  selectedItem?: Expenses;

  Items: Expenses[] = [];
  constructor(private iService : IncomesService) { }

  ngOnInit(){
    // will automatically get information
    this.iService.getAccountInfo('5').then((datas) => {
      let testIncome: Expenses;

      // For loop to assign testIncome with necessary data
      // Use testIncome to add the information
      for(let i = 0; i < datas.length; i++)
      {
        testIncome = { Name: datas[i].accountType, Amount: datas[i].totalBalance, ItemName: "test", 
        Price: datas[i].amount, Detail: datas[i].transactionName, showDate: datas[i].transactionDate }
        this.iService.addToIncome(testIncome);
      }
    })

    this.Items = this.iService.getIncomes();
    console.log(this.Items);
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
