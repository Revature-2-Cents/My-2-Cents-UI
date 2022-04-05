import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../_models/account';
import { environment } from 'src/environments/environment';

@Injectable({

  providedIn: 'root',
})
export class TransferService {
  private readonly apiUrl = environment.apiUrl;

  TransferFunds(fromAccount: number, toAccount: number, quantity: number): any {
    return this.http.post<any>(this.apiUrl + 'Transaction', {
      to: fromAccount,
      from: toAccount,
      amount: quantity,
    });
  }

  constructor(private http: HttpClient) {}
}
