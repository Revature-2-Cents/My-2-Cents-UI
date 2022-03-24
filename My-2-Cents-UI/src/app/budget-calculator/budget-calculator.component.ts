import { Component, Input, OnInit, NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { Chart } from 'node_modules/chart.js';
@Component({
  selector: 'app-budget-calculator',
  templateUrl: './budget-calculator.component.html',
  styleUrls: ['./budget-calculator.component.css']
})
export class BudgetCalculatorComponent implements OnInit {
  income: number = 1200;
  expenses: number[] = [300, 320, 150];


  budgetFormGroup = new FormGroup({
    income: new FormControl(0),
    expenses: new FormControl(0),
    wants: new FormControl(0),
    savings: new FormControl(0)
  })


  userIncome: number = 0;
  userExpenses: number = 0;
  userWants: number = 0;
  userSavings: number = 0;


  constructor() {
    this.listOfExpenses = [];

  }
  listOfExpenses: number[];

  ngOnInit(): void {


  }


  calculate() {
    let totalRemaining: number = this.income;
    totalRemaining -= this.userExpenses;
    console.log(totalRemaining);
    return totalRemaining;
  };


  percentCheck() {
    let needPercent = this.displayneeds();
    let wantPercent = this.displaywant();
    let savePercent = this.displaysave();
    if (this.calculate() < needPercent) {
      alert("your expenses are too high.");
      if (this.calculate() + wantPercent > needPercent) {
        alert("Reccomend lessening  wants.")
      }
      else if (this.calculate() + needPercent + wantPercent + savePercent > this.income) {
        alert("reccomend lessening wants and savings until expenses are lessened");
      }

    }
    else {
      console.log(this.calculate());
      console.log(needPercent);
      alert("Congrats your on budget");
    }
  }

  displaysave() {
    return this.income * 0.2;
  }

  displayneeds() {
    return this.income * 0.5;
  }
  displaywant() {
    return this.income * 0.3;
  }


  onClick(budgetFormGroup: FormGroup) {
    this.userIncome = budgetFormGroup.get("income").value;
    console.log(this.userIncome);
    this.userExpenses = budgetFormGroup.get("expenses").value;
    console.log(this.userExpenses);
    this.userSavings = budgetFormGroup.get("savings").value;
    console.log(this.userSavings);
    this.userWants = budgetFormGroup.get("wants").value;
    console.log(this.userWants);

    this.income = this.userIncome;
    console.log(this.income);
    this.expenses = [this.userExpenses, this.userSavings, this.userWants];
    console.log(this.expenses);

    this.percentCheck();
  }







}



