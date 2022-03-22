import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-budget-calculator',
  templateUrl: './budget-calculator.component.html',
  styleUrls: ['./budget-calculator.component.css']
})
export class BudgetCalculatorComponent implements OnInit {
  income: number = 1200;
  expenes: number [] = [300,320,150];

  

  budgetFormGroup = new FormGroup({
    income: new FormControl(0),
    expenses: new FormControl(0),
    wants: new FormControl(0),
    savings: new FormControl(0)
  })

  
  userIncome = 0;
  userExpenses = 0;
  userWants = 0;
  userSavings = 0;
  

  constructor() { 
    this.listOfExpenses = [];
    
    }
    listOfExpenses: number[];

  ngOnInit(): void {
    
  }
  calculate()
  {
    let totalRemaining:number = this.income;
    for (let i = 0; i < this.listOfExpenses.length; i++) {
      const expense = this.listOfExpenses[i];
      totalRemaining = totalRemaining - expense;
    }
    return totalRemaining;
  };
  

  percentCheck()
  {
    let needPercent = this.income * 0.5;
    let wantPercent = this.income * 0.3;
    let savePercent = this.income * 0.2;
      if(this.calculate() < needPercent)
      {
        alert("your expenses are too high.");
        if (this.calculate() + wantPercent > needPercent) {
          alert("Reccomend lessening  wants.")
        }
        else if(this.calculate() + needPercent + wantPercent + savePercent > this.income){
           alert("reccomend lessing savings");
        }
        
      }
      else{
          alert("Congrats your on budget");
      }
  }

  
  onClick () {

  }
}


