import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from './account';

@Injectable({
<<<<<<< HEAD
  providedIn: 'root'
})
export class TransferService {
  private Url = "https://my2centsapi.azurewebsites.net/api/Transaction";

  TransferFunds(fromAccount: number, toAccount: number, quantity: number): void {
    this.http.post<any>(this.Url, {to: 'fromAccount', from: 'toAccount', amount: 'quantity'}).subscribe(response => { console.log(response.status)});
  }

  constructor(private http: HttpClient) { }


=======
  providedIn: 'root',
})
export class TransferService {
  private Url = 'https://my2centsapi.azurewebsites.net/api/Transaction';

  TransferFunds(fromAccount: number, toAccount: number, quantity: number): any {
    return this.http.post<any>(this.Url, {
      to: fromAccount,
      from: toAccount,
      amount: quantity,
    });
  }

  constructor(private http: HttpClient) {}
>>>>>>> 407caa5473fde717e4f04a8a9cadf41fcc73c17a
}
