import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Incomes } from './mock-incomes';

import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomesService {
  incomes: Incomes[] = [];

  defaultUrl = "http://my2centsapi.azurewebsites.net";

  constructor(private http : HttpClient) { }

  addToIncome(income: Incomes)
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

  getAccountInfo(accountId: number): Promise<Incomes[]>{

    return lastValueFrom(this.http.get<Incomes[]>(this.defaultUrl + `/api/Transactions/${accountId}`));
  }
} 
