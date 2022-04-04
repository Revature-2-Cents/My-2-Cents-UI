import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-budget-info',
  templateUrl: './budget-info.component.html',
  styleUrls: ['./budget-info.component.css']
})
export class BudgetInfoComponent implements OnInit, OnChanges, AfterViewInit {

  @Input()
  userIncome: number = 0;
  @Input()
  userExpenses: number = 0;
  @Input()
  buttonCheck2: boolean = false;


  displayBudgetInfo = true; //this property will be used to display the correct user budget information like income,expenses,wants,and savings in conjunction with *ngIf 
  income: number;
  expenses: number;
  wants: number;
  savings: number;

  //change these to be percentages of Income
  expensesPercentage: ConstrainDouble = 0;
  wantsPercentage:ConstrainDouble = 0;
  savingsPercentage:ConstrainDouble = 0;
  expensesGoal:string = "";
  wantsGoal:string = "";
  savingsGoal:string = "";

  createPercentage() {

    this.income = this.userIncome;
    this.expenses = this.userExpenses;
    // this.wants = (this.userIncome - this.userExpenses) * 0.6;
    // this.savings = (this.userIncome - this.userExpenses) * 0.4;

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
      console.log("b-info:buttonCheck returned true");
      this.createPercentage();
      console.log("this is the new expenses: " + this.expenses);
      this.createGoals();
      this.buttonCheck2 = false;
      // this.buttonReturn.emit(false);
      
    }
    else
    {
      console.log("b-info:buttonCheck returned false");
    }
  }

  ngOnInit(): void {
    // this.createPercentage();
    // this.createGoals();
  }

}
