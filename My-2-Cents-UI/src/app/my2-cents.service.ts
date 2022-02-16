import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { UserProfile } from './userprofile';
import { Account, AccountTypes, NewAccount } from './account';

@Injectable({
  providedIn: 'root',
})
export class My2CentsService {
  private getUserInfoUrl = 'User/Info';
  private getUserAccountsUrl = 'AccountType/Accounts';
  private getAccountTypesUrl = 'AccountType/AccountsTypes';
  private postNewAccountUrl = 'AccountType/NewAccount';
  private postNewUser = 'User/NewUser';
  private updateUser = 'User/Update';

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

  //Get account types
  getAccountTypes(): Observable<AccountTypes[]> {
    return this.http.get<AccountTypes[]>(this.url + this.getAccountTypesUrl);
  }

  //Post New bank account
  createNewAccount(userId: number, accountTypeId: number) {
    return this.http.post<NewAccount[]>(this.url + this.postNewAccountUrl, {
      userId,
      accountTypeId,
    });
  }

  //Post user accounts
  json: any;
  inputData: UserProfile = {} as UserProfile;
  PostUserAccounts(inputData: UserProfile) {
    lastValueFrom(
      this.http.post<any>(
        this.url + this.postNewUser,
        inputData,
        this.httpOptions
      )
    ).then((data: any) => {
      console.log(data);
      //  console.log(data.json.test);
      this.json = JSON.stringify(data.json);
      alert('Created!');
    });
  }

  //Update user accounts
  PutUserAccounts(datas: any) {
    console.log(datas[0]);
    this.inputData.UserID = datas[0].userId;
    this.inputData.FirstName = datas[0].firstName;
    this.inputData.LastName = datas[0].lastName;
    this.inputData.SecondaryEmail = datas[0].secondaryEmail;
    this.inputData.MailingAddress = datas[0].mailingAddress;
    this.inputData.Phone = datas[0].phone;
    this.inputData.City = datas[0].city;
    this.inputData.State = datas[0].state;
    this.inputData.Employer = datas[0].employer;
    this.inputData.WorkAddress = datas[0].workAddress;
    this.inputData.WorkPhone = datas[0].workPhone;
    this.inputData.email = datas[0].secondaryEmail;

    console.log(this.inputData);

    lastValueFrom(
      this.http.put<any>(
        this.url + this.updateUser,
        this.inputData,
        this.httpOptions
      )
    ).then((data: any) => {
      console.log(data);
      //  console.log(data.json.test);
      this.json = JSON.stringify(data.json);
      alert('Saved!');
    });
  }
}
