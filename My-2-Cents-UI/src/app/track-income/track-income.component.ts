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

  ngOnInit(){
    const id = Number(this.route.snapshot.paramMap.get('AccountID'));
    console.log("ID: " + id);
    
    this.iService.getAccountInfo(id).then((datas) => {
        this.Items=datas;
    })
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
