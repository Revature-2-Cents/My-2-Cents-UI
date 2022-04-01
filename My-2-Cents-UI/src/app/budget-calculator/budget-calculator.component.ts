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
    income: new FormControl(0),
    expenses: new FormControl(0),
    wants: new FormControl(0),
    savings: new FormControl(0)
  })

  userIncome: number = 0;
  userExpenses: number = 0;
  userWants: number = 0;
  userSavings: number = 0;
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



