import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Expenses, Incomes } from './mock-incomes';

import { lastValueFrom, Observable, throwError } from 'rxjs';
import { catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IncomesService {
  incomes: Expenses[] = [];

  defaultUrl = "http://my2centsapi.azurewebsites.net";

  constructor(private http : HttpClient) { }

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

  getAccountInfo(accountId: string): Promise<Incomes[]>{
    // const params = new HttpParams()
    //    .set('Id', accountId);
    //return lastValueFrom(this.http.get<Incomes[]>(`https://localhost:7106/api/Transactions/${accountId}`));
    return lastValueFrom(this.http.get<Incomes[]>(this.defaultUrl + `/api/Transactions/${accountId}`));
  }
}
