import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CryptoOrder, StockOrder } from '../_models/investmentPortfolio';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class InvestmentPortfolioService {
  ApiURL = environment.apiUrl;
  CryptoOrders: CryptoOrder[] = [];
  stockOrders: StockOrder[] = [];
  user: User;

  constructor(private http: HttpClient) { }

  getAllCryptoOrderHistoryByUser(userId: string | number | any): Observable<any> {
    return this.http.get<any>(this.ApiURL + `CryptoPortfolio/GetCryptoOrderhistoryTable?_userID=${userId}`);
  }

  getAllStockOrderHistoryByUser(userId: string | number | any): Observable<any> {
    return this.http.get<any>(this.ApiURL + `StockPortfolio/StockOrders/OrderPortfolio/${userId}`);
  }

  getAllStockAssetByUser(userId: string | number | any): Observable<any> {
    return this.http.get<any>(this.ApiURL + `StockPortfolio/StockOrders/AssetsPortfolio/${userId}`);
  }

  getAllCryptoAssetByUser(userId: string | number | any): Observable<any> {
    return this.http.get<any>(this.ApiURL + `CryptoPortfolio/GetCryptoAssetTable?_userID=${userId}`);
  }

}
