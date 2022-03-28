import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-budget-info',
  templateUrl: './budget-info.component.html',
  styleUrls: ['./budget-info.component.css']
})
export class BudgetInfoComponent implements OnInit {

  @Input()
  userIncome: number = 0;
  @Input()
  userExpenses: number = 0;

  displayBudgetInfo = true; //this property will be used to display the correct user budget information like income,expenses,wants,and savings in conjunction with *ngIf 
  income: number = this.userIncome;

  expenses: number = this.userExpenses;

  wants: number = (this.userIncome - this.userExpenses) * 0.6;

  savings: number = (this.userIncome - this.userExpenses) * 0.4;


  constructor() { }

  ngOnInit(): void {
  }

}
