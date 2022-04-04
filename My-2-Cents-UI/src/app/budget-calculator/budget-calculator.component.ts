import { Component, Input, OnInit, NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { delay } from 'rxjs';
import { BudgetChartComponent } from '../budget-chart/budget-chart.component';
import { BudgetInfoComponent } from '../budget-info/budget-info.component';
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
  buttonCheck: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  onClick(budgetFormGroup: FormGroup) {
    this.userIncome = budgetFormGroup.get("income").value;
    console.log(this.userIncome);
   
    this.userExpenses = budgetFormGroup.get("expenses").value;
    console.log(this.userExpenses);
    // if (!this.useChart)
    // {
      this.useChart = !this.useChart;
    // }
    // else
    // {
    //   this.buttonCheck = !this.buttonCheck;
    // }
  }







}



