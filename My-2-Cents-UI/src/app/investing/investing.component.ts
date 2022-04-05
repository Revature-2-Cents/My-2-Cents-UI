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
  styleUrls: [
    "../../../node_modules/bootstrap/dist/css/bootstrap.css",
    './investing.component.css'
  ]
})
export class InvestingComponent implements OnInit {

  showList = true;
  isDefault = true;
  isSearching = false;
  filteredStocks: Stock[] = [];
  stocks: Stock[] = [];
  coins: MarketCoin[] = [];
  filteredCoins: MarketCoin[] = [];
  searchCryptoText = '';
  searchStockText = '';
  tradableSymbols = [];
  selectedAsset: any;

  constructor(public service:AssetExchangeService) {

  }

  convertDecimal(num:number) {
    return Math.round(num * 100) / 100;
  }

  searchCoin() {
    this.filteredCoins = this.coins.filter(
      (coin) => coin.name.toLowerCase().includes(this.searchCryptoText.toLowerCase()) ||
                coin.shortenedName.toLowerCase().includes(this.searchCryptoText.toLowerCase())
    );
  }

  searchStock(): void {
    this.filteredStocks = this.stocks.filter(
      (s) => s.name.toLowerCase().includes(this.searchStockText.toLowerCase()) ||
                s.shortenedName.toLowerCase().includes(this.searchStockText.toLowerCase())
    );
  }

  loadDefaultStocks(): void {
    this.isDefault = true;
    this.isSearching = false;

    this.service
    .loadStock()
    .subscribe((res) => {
      console.log(res);
      this.stocks = res;
    },
    (err) => console.log(err));
  }

  showListings(): void {
    this.showList = true;
  }

  ngOnInit(): void {
    this.service
      .loadCrypto()
      .subscribe((res) => {
      this.coins = res;
      this.filteredCoins = this.coins;
      },
      (err) => console.log(err));

      this.loadDefaultStocks();
  }

  nav(str: string, asset: any): void {
    this.forNav = str;
    this.selectedAsset = asset;
    if(str != "Investing") {
      this.showList = false;
    }
  }

  public forNav: string = 'Investing';

}