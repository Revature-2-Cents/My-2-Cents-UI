import { Component, OnInit } from '@angular/core';
import { Incomes } from '../mock-incomes'

import { IncomesService } from '../incomes.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-track-income', 
  templateUrl: './track-income.component.html',
  styleUrls: ['./track-income.component.css']
})
export class TrackIncomeComponent implements OnInit {
  selectedItem?: Incomes;
  Items: Incomes[] = [];

  constructor(private iService : IncomesService, private route: ActivatedRoute, private location: Location) { }

  // will automatically get information
  ngOnInit(){
    // Pull the number from the url
    const id = Number(this.route.snapshot.paramMap.get('AccountID'));
    console.log("ID: " + id);
    
    // Send Http Request based on id
    this.iService.getAccountInfo(id).then((datas) => {
      //let testIncome: Incomes;

      // For loop to assign testIncome with necessary data
      // Use testIncome to add the information
      for(let i = 0; i < datas.length; i++)
      {
        this.Items=datas;

        // testIncome = datas[i];
        // this.iService.addToIncome(testIncome);
      }
    })
    //this.Items = this.iService.getIncomes();
  }

  selectItem(Item: Incomes): void {
    if(this.selectedItem === Item){
      this.selectedItem = undefined;
    }
    else{
      this.selectedItem = Item;
    }
  }

  navigateToDashBoard()
 {
    this.location.back();
  }
}
