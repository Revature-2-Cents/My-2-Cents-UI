import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private Url = "https://my2centsapi.azurewebsites.net/api/Transaction";

  constructor(private http: HttpClient) { }

  TransferFunds(fromAccount: number, toAccount: number, quantity: number): any  {
    return this.http.post<any>(this.Url, {to: 'fromAccount', from: 'toAccount', amount: 'quantity'});
  }
}