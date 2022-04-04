import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit, NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { delay } from 'rxjs';
import { BudgetChartComponent } from '../budget-chart/budget-chart.component';
import { BudgetInfoComponent } from '../budget-info/budget-info.component';
import { IncomesService } from '../_services/incomes.service';
// import { Chart } from 'node_modules/chart.js';
@Component({
  selector: 'app-budget-calculator',
  templateUrl: './budget-calculator.component.html',
  styleUrls: ['./budget-calculator.component.css']
})
export class BudgetCalculatorComponent implements OnInit {
  budgetFormGroup = new FormGroup({
    income: new FormControl(0, [Validators.required]),
    expenses: new FormControl(0,[Validators.required]),
    wants: new FormControl(),
    savings: new FormControl(),
  })
  
  get UserIncome()
  {
    return this.budgetFormGroup.get("income");
  }

  get UserExpense()
  {
    return this.budgetFormGroup.get("expenses");
  }

  userIncome: number ;
  userExpenses: number ;
  userWants: number;
  userSavings: number ;
  useChart: boolean = false;
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
  }
  
  returnButton2EventListener(buttonReturn2: boolean)
  {
    this.buttonCheck2 = buttonReturn2;
  }







}



