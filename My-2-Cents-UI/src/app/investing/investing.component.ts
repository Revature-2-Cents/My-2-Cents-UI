import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription, switchMap, timer } from 'rxjs';
import { User } from '../_models/User';

interface Coin {
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
}

interface Stock {
  symbol: string;
  marketCap: number;
  longName: string;
  name: string;
  regularMarketPrice: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketDayHigh: number;
  regularMarketDayLow: number;
  regularMarketVolume: number;
  fiftyTwoWeekLowChange: number;
  fiftyTwoWeekLowChangePercent: number;
  fiftyTwoWeekRange: number;
  fiftyTwoWeekHighChange: number;
  fiftyTwoWeekHighChangePercent: number;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
}

@Component({
  selector: 'app-investing',
  templateUrl: './investing.component.html',
  styleUrls: ['./investing.component.css']
})
export class InvestingComponent implements OnInit {

  subscription: Subscription = new Subscription;
  isDefault = true;
  isSearching = false;
  searchStocks: Stock[] = [];
  filteredStocks: Stock[] = [];
  stocks: Stock[] = [];
  tradableCoins: Coin[] = [];
  coins: Coin[] = [];
  filteredCoins: Coin[] = [];
  searchCryptoText = '';
  searchStockText = '';
  tradableSymbols = [];
  cryptoAPI: string =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false';

  stockAPI: string =
    'https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=DIA%2CSPY%2CQQQ%2CIWM';

  @Input() userId: number = -1;

  @Input() User = <User>{};

  constructor(private http: HttpClient) {
    this.tradableSymbols = ["btc", "eth", "bnb", "xrp", "doge", "shib", "usdt", "usdc", "ada", "ltc", "bch", "xlm", "xmr"];
  }

  convertDecimal(num:number) {
    return Math.round(num * 100) / 100;
  }

  searchCoin() {
    this.filteredCoins = this.tradableCoins.filter(
      (coin) => coin.name.toLowerCase().includes(this.searchCryptoText.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(this.searchCryptoText.toLowerCase())
    );
  }

  searchStock(): void {
    if (this.searchStockText == '') {
      this.isSearching = false;
      this.isDefault = true;
      this.loadDefaultStocks();
    } else {
      this.isSearching = true;
      this.isDefault = false;
      let headers = new HttpHeaders();
      headers = headers.set('x-api-key', 'f1Txvh597x1PlwqtqNYTpuLVwM8CdO57zVZAMjM1');
      let searchAPI = "https://yfapi.net/v6/finance/autocomplete?region=US&lang=en&query="+ this.searchStockText;

      this.http
        .get<Stock[]>(searchAPI, { headers: headers })
        .subscribe((res) => {
          this.searchStocks = res["ResultSet"].Result;
          console.log(res["ResultSet"].Result);
        },
        (err) => console.log(err));

        this.filteredStocks = this.searchStocks.filter(
          (stock) => stock.name.toLowerCase().includes(this.searchStockText.toLowerCase()) ||
                    stock.symbol.toLowerCase().includes(this.searchStockText.toLowerCase())
        );
    }
  }

  loadDefaultStocks(): void {
    this.isDefault = true;
    this.isSearching = false;
    let headers = new HttpHeaders();
    headers = headers.set('x-api-key', 'LQowaJNjfK77RALb1dZpT3OauQfZkaQJ8mnRB7iw');

    this.http
    .get<Stock[]>(this.stockAPI, {
      headers: headers
    })
    .subscribe((res) => {
      this.stocks = res["quoteResponse"].result;
    },
    (err) => console.log(err));
  }

  ngOnInit(): void {
    this.subscription = timer(0, 10000).pipe(
      switchMap(() => this.http
      .get<Coin[]>(this.cryptoAPI))
    ).subscribe((res) => {
      this.coins = res;
      this.tradableCoins = [];
      for(var coin in this.coins) {
        if(this.tradableSymbols.find(u=> u == this.coins[coin].symbol)) {
          this.tradableCoins.push(this.coins[coin]);
        }
      }
      this.filteredCoins = this.tradableCoins;
      },
      (err) => console.log(err));

      this.loadDefaultStocks();
  }

}