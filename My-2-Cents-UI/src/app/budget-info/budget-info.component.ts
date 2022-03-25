import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-budget-info',
  templateUrl: './budget-info.component.html',
  styleUrls: ['./budget-info.component.css']
})
export class BudgetInfoComponent implements OnInit {

  displayBudgetInfo = true; //this property will be used to display the correct user budget information like income,expenses,wants,and savings in conjunction with *ngIf 
  income: number = 5000;
  expenses: number = 2500;
  wants: number = 1500;
  savings: number = 1000;
  constructor() { }

  ngOnInit(): void {
  }

}
