import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

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

  userIncome = 0;
  userExpenses = 0;
  userWants = 0;
  userSavings = 0;


  constructor() { }

  ngOnInit(): void {


  }

  onClick () {
    
  }

}


