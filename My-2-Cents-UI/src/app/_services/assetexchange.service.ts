import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GraphCoin } from '../_models/graph.model';
import { environment } from 'src/environments/environment';
import { GraphStock } from '../_models/graphstock.model';
import { MarketCoin } from '../_models/marketcoin.model';
import { Stock } from '../_models/stock.model';

@Injectable({
  providedIn: 'root'
})
export class AssetExchangeService {

  private readonly apiUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  convertDecimal(num:number) {
    return Math.round(num * 100) / 100;
  }

  loadCrypto(): Observable<MarketCoin[]>
  {
    return this.http.get<MarketCoin[]>('https://localhost:7106/api/InvestmentPlatform/GetCrypto');
  }

  loadStock(): Observable<Stock[]>
  {
    return this.http.get<Stock[]>('https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=DIA%2CSPY%2CQQQ%2CIWM');
  }

  loadDailyChart(cryptoName:string|null) : Observable<GraphCoin>
  {
    let cryptoNameString:string = <string>cryptoName;
    cryptoNameString = cryptoNameString.toLowerCase();
    return this.http.get<GraphCoin>("https://api.coingecko.com/api/v3/coins/${cryptoNameString}/market_chart?vs_currency=usd&days=365&interval=daily`");
  }

  getStockByName(stockName:string|null) : Observable<Stock>
  {
    return this.http.get<Stock>("https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${stockName}");
  }

  loadDailyStockChart(stockName:string|null) : Observable<GraphStock>
  {
    return this.http.get<GraphStock>("https://yfapi.net/v8/finance/chart/"+stockName+"?range=1y&region=US&interval=1d&lang=en");
  }

  buyCryptoInFiat(userID:number, amount:number, coin:MarketCoin)
  {
    var cryptoID = coin.cryptoId;
    return this.http.post<MarketCoin>(this.apiUrl + "InvestmentPlatform/PlaceOrderCryptoFiat?p_userID="+userID+"&p_cryptoID="+cryptoID+"&amount="+amount, coin);
  }

  buyCrypto(userID:number, amount:number, coin:MarketCoin)
  {
    var cryptoID = coin.cryptoId;
    return this.http.post<MarketCoin>(this.apiUrl + "InvestmentPlatform/PlaceOrderCrypto?p_userID="+userID+"&p_cryptoID="+cryptoID+"&amount="+amount, coin);
  }

  sellCryptoInFiat(userID:number, amount:number, coin:MarketCoin)
  {
    var cryptoID = coin.cryptoId;
    return this.http.post<MarketCoin>(this.apiUrl + "InvestmentPlatform/SellCryptoFiat?p_userID="+userID+"&p_cryptoID="+cryptoID+"&amount="+amount, coin);
  }

  sellCrypto(userID:number, amount:number, coin:MarketCoin)
  {
    var cryptoID = coin.cryptoId;
    return this.http.post<MarketCoin>(this.apiUrl + "InvestmentPlatform/SellCrypto?p_userID="+userID+"&p_cryptoID="+cryptoID+"&amount="+amount, coin);
  }

  buyStockInFiat(userID:number, amount:number, stock:Stock)
  {
    var stockID = stock.id;
    return this.http.post<MarketCoin>(this.apiUrl + "InvestmentPlatform/PlaceOrderStockFiat?p_userID="+userID+"&p_stockID="+stockID+"&amount="+amount, stock);
  }

  buyStock(userID:number, amount:number, stock:Stock)
  {
    var stockID = coin.cryptoId;
    return this.http.post<MarketCoin>(this.apiUrl + "InvestmentPlatform/PlaceOrderStock?p_userID="+userID+"&_stockID="+stockID+"&amount="+amount, stock);
  }

  sellStockInFiat(userID:number, amount:number, stock:Stock)
  {
    var stockID = stock.id;
    return this.http.post<MarketCoin>(this.apiUrl + "InvestmentPlatform/SellStockFiat?p_userID="+userID+"&p_stockID="+stockID+"&amount="+amount, stock);
  }

  sellStock(userID:number, amount:number, stock:Stock)
  {
    var stockID = stock.id;
    return this.http.post<MarketCoin>(this.apiUrl + "InvestmentPlatform/SellStock?p_userID="+userID+"&p_stockID="+stockID+"&amount="+amount, stock);
  }

}