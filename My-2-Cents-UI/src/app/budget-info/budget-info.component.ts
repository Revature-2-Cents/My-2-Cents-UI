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
  income: number;
  expenses: number;
  wants: number;
  savings: number;

  //change these to be percentages of Income
  expensesPercentage: number = 0;
  wantsPercentage:number = 0;
  savingsPercentage:number = 0;


  createPercentage(){

    this.income = this.userIncome;
    this.wants = (this.userIncome - this.userExpenses) * 0.6;
    this.savings = (this.userIncome - this.userExpenses) * 0.4;

    this.expenses = this.userExpenses;
    this.expensesPercentage = this.expenses / this.income * 100;
    this.wantsPercentage =  this.wants / this.income * 100;
    this.savingsPercentage = this.savings / this.income * 100;
  
  }
  
  
  
  constructor() { }

  ngOnInit(): void {
    this.createPercentage();
  }

 
}
