import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';

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
   
    this.userExpenses = budgetFormGroup.get("expenses").value;
    if (!this.useChart)
    {
      this.useChart = !this.useChart;      
    }
    else
    {
      this.buttonCheck = true;
      this.buttonCheck2 = true;
    }
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



