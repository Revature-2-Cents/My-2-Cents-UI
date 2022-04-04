import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Incomes } from '../_models/mock-incomes';

import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IncomesService {
  private readonly apiUrl = environment.apiUrl;
  incomes: Incomes[] = [];

  constructor(private http: HttpClient) {}

  addToIncome(income: Incomes) {
    this.incomes.push(income);
  }

  getIncomes() {
    return this.incomes;
  }

  clearIncomes() {
    this.incomes = [];
    return this.incomes;
  }

  getAccountInfo(accountId: number): Promise<Incomes[]> {
    return lastValueFrom(
      this.http.get<Incomes[]>(
        this.apiUrl + `Transactions/${accountId}`
      )
    );
  }
}
