import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrytoOrder } from '../_models/investmentPortfolio';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class InvestmentPortfolioService {
  ApiURL = environment.apiUrl;
  crytoOrders: CrytoOrder[] = [];
  user: User;

  constructor(private http: HttpClient) { }

  getAllCryptoOrderHistoryByUser(userID: number): Observable<any> {
    return this.http.get<any>(this.ApiURL + `CryptoPortfolio/GetCryptoOrderhistorybyUser/${userID}`);
  }
  
}
