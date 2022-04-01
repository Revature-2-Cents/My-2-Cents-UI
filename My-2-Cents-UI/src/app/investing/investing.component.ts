import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription, switchMap, timer } from 'rxjs';
import { MarketCoin } from '../_models/marketcoin.model';
import { Stock } from '../_models/stock.model';
import { User } from '../_models/User';
import { AssetExchangeService } from '../_services/assetexchange.service';

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
  tradableCoins: MarketCoin[] = [];
  coins: MarketCoin[] = [];
  filteredCoins: MarketCoin[] = [];
  searchCryptoText = '';
  searchStockText = '';
  tradableSymbols = [];

  @Input() userId: number = -1;

  @Input() User = <User>{};

  constructor(public service:AssetExchangeService) {
    this.tradableSymbols = ["btc", "eth", "bnb", "xrp", "doge", "shib", "usdt", "usdc", "ada", "ltc", "bch", "xlm", "xmr"];
  }

  convertDecimal(num:number) {
    return Math.round(num * 100) / 100;
  }

  searchCoin() {
    this.filteredCoins = this.tradableCoins.filter(
      (coin) => coin.name.toLowerCase().includes(this.searchCryptoText.toLowerCase()) ||
                coin.shortenedName.toLowerCase().includes(this.searchCryptoText.toLowerCase())
    );
  }

  NavName: string = 'Dashboard';
  nav(button: string) {
    this.NavName = button;
  }

  searchStock(): void {
    if (this.searchStockText == '') {
      this.isSearching = false;
      this.isDefault = true;
      this.loadDefaultStocks();
    } else {
      this.isSearching = true;
      this.isDefault = false;

      this.service
        .loadCrypto()
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

    this.service
    .loadStock()
    .subscribe((res) => {
      this.stocks = res["quoteResponse"].result;
    },
    (err) => console.log(err));
  }

  ngOnInit(): void {
    this.service
      .loadCrypto()
      .subscribe((res) => {
      this.coins = res;
      this.tradableCoins = [];
      for(var coin in this.coins) {
        if(this.tradableSymbols.find(u=> u == this.coins[coin].shortenedName)) {
          this.tradableCoins.push(this.coins[coin]);
        }
      }
      this.filteredCoins = this.tradableCoins;
      },
      (err) => console.log(err));

      this.loadDefaultStocks();
  }

}