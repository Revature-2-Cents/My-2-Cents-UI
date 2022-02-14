import { Component, OnInit } from '@angular/core';
import { Expenses,Incomes, Mock_Items } from '../mock-incomes'
import { Router,ActivatedRoute, ParamMap } from '@angular/router'
import { IncomesService } from '../incomes.service';

@Component({
  selector: 'app-track-income',
  templateUrl: './track-income.component.html',
  styleUrls: ['./track-income.component.css']
})
export class TrackIncomeComponent implements OnInit {

  //Items : Expenses[] = Mock_Items;

  selectedItem?: Incomes;
  id?: string;
  Items: Incomes[] = [];
  constructor(private iService : IncomesService,private ActiveRoute: ActivatedRoute
    , private _router: Router,
    ) { }

  ngOnInit(){
    // will automatically get information
    //alert("123");

    this.id=this.ActiveRoute.snapshot.paramMap.get("AccountID") + "";    
    this.iService.getAccountInfo(this.id+"").then((datas) => {

      this.Items=datas;
//      let testIncome: Expenses;

      // For loop to assign testIncome with necessary data
      // Use testIncome to add the information
  //    for(let i = 0; i < datas.length; i++)
  //    {
   //     testIncome = { Name: datas[i].accountType, Amount: datas[i].totalBalance, ItemName: "test", 
   //     Price: datas[i].amount, Detail: datas[i].transactionName, showDate: datas[i].transactionDate }
    //    this.iService.addToIncome(testIncome);
    //  }
    })

    //this.Items = this.iService.getIncomes();
    //console.log(this.Items);
  }

  selectItem(Item: Incomes): void {
    if(this.selectedItem === Item){
      this.selectedItem = undefined;
    }
    else{
      this.selectedItem = Item;
    }
  }

  navigateToDashBourd() {
    this._router.navigate(['dashboard'])
  }
  test()
  {

  }
}
