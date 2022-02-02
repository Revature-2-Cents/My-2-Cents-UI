import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Expenses } from './mock-incomes';

import { lastValueFrom, Observable, throwError } from 'rxjs';
import { catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IncomesService {
  incomes: Expenses[] = [];

  defaultUrl = "http://my2centsapi.azurewebsites.net/";

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

  getAccountInfo(): Promise<Expenses[]>{
    const headers = new HttpHeaders()
      .set('content-type', 'text/plain')
      .set('Access-Control-Allow-Origin', `*`)
    // const params = new HttpParams()
    //   .set('', this.incomes[0].Name);
    return lastValueFrom(this.http.get<Expenses[]>(this.defaultUrl, {headers}));
  }
}
