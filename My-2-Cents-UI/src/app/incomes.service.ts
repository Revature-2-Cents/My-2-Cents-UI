import { Injectable } from '@angular/core';

import { Expenses } from './mock-incomes';

@Injectable({
  providedIn: 'root'
})
export class IncomesService {
  incomes: Expenses[] = [];

  constructor() { }

  addToIncome(income: Expenses)
  {
    this.incomes.push(income)
  }

  getIncomes()
  {
    return this.incomes
  }

  clearIncomes()
  {
    this.incomes = [];
    return this.incomes;
  }
}
