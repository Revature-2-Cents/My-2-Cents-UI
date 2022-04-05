import { AfterViewInit, Component, Input, OnChanges, Output, SimpleChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-budget-info',
  templateUrl: './budget-info.component.html',
  styleUrls: ['./budget-info.component.css']
})
export class BudgetInfoComponent implements OnChanges, AfterViewInit {

  @Input()
  userIncome: number = 0;
  @Input()
  userExpenses: number = 0;
  @Input()
  buttonCheck2: boolean = false;

  @Output()
  buttonReturn2 = new EventEmitter<boolean>();


  displayBudgetInfo = true; //this property will be used to display the correct user budget information like income,expenses,wants,and savings in conjunction with *ngIf 
  income: number;
  expenses: number;
  wants: number;
  savings: number;

  expensesPercentage: ConstrainDouble = 0;
  wantsPercentage:ConstrainDouble = 0;
  savingsPercentage:ConstrainDouble = 0;
  expensesGoal:string = "";
  wantsGoal:string = "";
  savingsGoal:string = "";

  createPercentage() {

    this.income = this.userIncome;
    this.expenses = this.userExpenses;

    if (this.userExpenses <= this.userIncome * 0.5) {
      this.wants = Math.round(((this.userIncome * (0.3 + (0.5 - (this.userExpenses / this.userIncome)))) + Number.EPSILON) * 100) / 100;
      this.savings = Math.round(((this.userIncome * 0.2) + Number.EPSILON) * 100) / 100;
    }
    else if (this.userExpenses <= this.userIncome * 0.8) {
      this.wants = Math.round(((this.userIncome * (0.8 - (this.userExpenses / this.userIncome))) + Number.EPSILON) * 100) / 100;
      this.savings = Math.round(((this.userIncome * 0.2) + Number.EPSILON) * 100) / 100;
    }
    else if (this.userExpenses <= this.userIncome * 0.99) {
      this.wants = 0;
      this.savings = Math.round(((this.userIncome * (1 - (this.userExpenses / this.userIncome))) + Number.EPSILON) * 100) / 100;
    }
    else {
      this.wants = 0;
      this.savings = 0;
    }

    this.expensesPercentage = Math.round(((this.expenses / this.income * 100) + Number.EPSILON) * 100) / 100;
    this.wantsPercentage = Math.round(((this.wants / this.income * 100) + Number.EPSILON) * 100) / 100;
    this.savingsPercentage = Math.round(((this.savings / this.income * 100) + Number.EPSILON) * 100) / 100;

  }
  
  createGoals(){
    if(this.expensesPercentage <= 50)
    {
      this.expensesGoal = "YES";
    }
    else
    {
      this.expensesGoal = "NO";
    }
    if(this.wantsPercentage >= 30)
    {
      this.wantsGoal = "YES";
    }
    else
    {
      this.wantsGoal = "NO";
    }
    if(this.savingsPercentage >= 20)
    {
      this.savingsGoal = "YES";
    }
    else
    {
      this.savingsGoal = "NO";
    }
  }


  constructor() { }

  ngAfterViewInit(): void {
    this.createPercentage();
    this.createGoals();
    }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.buttonCheck2)
    {
      this.createPercentage();
      this.createGoals();
      this.buttonCheck2 = false;
      this.buttonReturn2.emit(false);
    }
  }
}
