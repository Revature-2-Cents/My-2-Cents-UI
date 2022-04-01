import { Component, Input, OnInit, NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { Chart } from 'node_modules/chart.js';
@Component({
  selector: 'app-budget-calculator',
  templateUrl: './budget-calculator.component.html',
  styleUrls: ['./budget-calculator.component.css']
})
export class BudgetCalculatorComponent implements OnInit {

  budgetFormGroup = new FormGroup({
    income: new FormControl([Validators.required]),
    expenses: new FormControl(),
    wants: new FormControl(),
    savings: new FormControl(),
  })
  
  get income()
  {
    return this.budgetFormGroup.get("income");
  }
  userIncome: number ;
  userExpenses: number ;
  userWants: number;
  userSavings: number ;
  useChart: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  onClick(budgetFormGroup: FormGroup) {
    this.userIncome = budgetFormGroup.get("income").value;
    console.log(this.userIncome);
   
    this.userExpenses = budgetFormGroup.get("expenses").value;
    console.log(this.userExpenses);
    this.useChart = !this.useChart;
  }







}



