import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private Url = "https://my2centsapi.azurewebsites.net/api/Transaction";

  TransferFunds(fromAccount: number, toAccount: number, quantity: number): void {
    this.http.post<any>(this.Url, {to: 'fromAccount', from: 'toAccount', amount: 'quantity'}).subscribe(response => { console.log(response.status)});
  }

  constructor(private http: HttpClient) { }

 
}