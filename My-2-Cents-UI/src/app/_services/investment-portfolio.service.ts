import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrytoOrder, StockOrder } from '../_models/investmentPortfolio';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class InvestmentPortfolioService {
  ApiURL = environment.apiUrl;
  crytoOrders: CrytoOrder[] = [];
  stockOrders: StockOrder[] = [];
  user: User;

  constructor(private http: HttpClient) { }

  getAllCryptoOrderHistoryByUser(userId: string | number | any): Observable<any> {
    return this.http.get<any>(this.ApiURL + `CryptoPortfolio/GetCryptoOrderhistorybyUser?_userID=${userId}`);
  }

  getAllStockOrderHistoryByUser(userId: string | number | any): Observable<any> {
    return this.http.get<any>(this.ApiURL + `StockPortfolio/StockOrders/OrderPortfolio/${userId}`);  
  }

  getAllStockAssetByUser(userId: string | number | any): Observable<any> {
    return this.http.get<any>(this.ApiURL + `StockPortfolio/StockOrders/AssetsPortfolio/${userId}`);  
  }

}
