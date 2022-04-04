import { ThisReceiver } from '@angular/compiler';
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
  useChart: boolean;
  buttonCheck: boolean = false;
  buttonCheck2: boolean = false;


  constructor() {  }

  ngOnInit(): void {
  }

  onClick(budgetFormGroup: FormGroup) {
    this.userIncome = budgetFormGroup.get("income").value;
    console.log(this.userIncome);
    this.userExpenses = budgetFormGroup.get("expenses").value;
    console.log(this.userExpenses);
    console.log("Button check is = " + this.buttonCheck);
    if (!this.useChart)
    {
      this.useChart = !this.useChart;      
    }
    else
    {
      this.buttonCheck = true;
      this.buttonCheck2 = true;
    }
    console.log("Button check is = " + this.buttonCheck);
  }
  
  returnButtonEventListener(buttonReturn: boolean)
  {
    this.buttonCheck = buttonReturn;
    this.buttonCheck2 = buttonReturn;
  }







}



