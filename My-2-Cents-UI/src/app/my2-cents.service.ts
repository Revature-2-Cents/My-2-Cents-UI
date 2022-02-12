import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from './userprofile';
import { Account } from './account';

@Injectable({
  providedIn: 'root',
})
export class My2CentsService {
  private getUserInfoUrl = 'User/Info';
  private getUserAccountsUrl = 'AccountType/Accounts';
  private url = 'https://my2centsapi.azurewebsites.net/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  //GET user info
  getUserInfo(userId: number): Observable<UserProfile[]> {
    let params = new HttpParams().set('UserID', userId);
    return this.http.get<UserProfile[]>(this.url + this.getUserInfoUrl, {
      params,
    });
  }

  //GET user accounts
  getUserAccounts(userId: number): Observable<Account[]> {
    let params = new HttpParams().set('UserID', userId);
    return this.http.get<Account[]>(this.url + this.getUserAccountsUrl, {
      params,
    });
  }
}
