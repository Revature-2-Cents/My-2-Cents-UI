import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { GraphCoin } from '../_models/graph.model';
import { User } from '../_models/User';
import { ChartConfiguration, ChartType } from 'chart.js';
import { MarketCoin } from '../_models/marketcoin.model';
import { ActivatedRoute } from '@angular/router';
import { AssetExchangeService } from '../_services/assetexchange.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { My2CentsService } from '../_services/my2-cents.service';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: [
    "../../../node_modules/bootstrap/dist/css/bootstrap.css",
    './crypto.component.css']
})
export class CryptoComponent implements OnInit {

  attemptingToPurchase = false;
  purchasing: FormGroup = new FormGroup({
    amount: new FormControl('')
  });
  attemptingToSell = false;
  selling: FormGroup = new FormGroup({
    amount: new FormControl('')
  });
  isBuyingSuccess = false;
  isBuyingFailed = false;
  isSellingSuccess = false;
  isSellingFailed = false;
  isInFiat = false;

  cryptoName:string | null = "No Crypto Selected";
  coin: MarketCoin;
  graph: GraphCoin;
  user = <User>{};
  currentCash: number;

  @Input() Crypto = <MarketCoin>{};

  public lineChartData: ChartConfiguration['data'];
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        }
    }
  };
  public lineChartType: ChartType = 'line';

  constructor(private router:ActivatedRoute, private formBuilder: FormBuilder, public service:AssetExchangeService, private account:AccountService, private cents:My2CentsService) {
    this.coin = {
      cryptoId: 0,
      imageURL: '',
      name: '',
      shortenedName: '',
      currentPrice: 0,
      priceChange: 0,
      priceChangePercentage: 0,
      cryptoNameId:''
    };
    this.graph = {
      prices: []
    };
    this.lineChartData = {
      datasets: [
        {
          data: [ 65, 59, 80, 81, 56, 55, 40 ],
          label: 'Series A',
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
        }
      ],
      labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ]
    };
    this.account.currentUser.pipe(take(1)).subscribe((data) => this.user = data);
  }

  updateCash(): void
  {
    this.cents.getUserAccounts(this.user.userId).subscribe(res => this.currentCash = res[0].totalBalance);
  }

  ngOnInit(): void {
    this.cryptoName = this.Crypto.cryptoNameId;
    this.service.loadCrypto().subscribe((res) => {
      var temp = res.find(d => d.cryptoNameId == this.cryptoName);
      this.coin = temp;
    },
    (err) => console.log(err));

    this.service.loadDailyChart(this.cryptoName).subscribe((res) => {
      this.graph = res;

      var time = this.graph.prices.map(x => x[0]);
      var date: string[] = [];
      time.forEach(function(t) {
          var read = new Date(t).toDateString();
          date.push(read);
      });

      this.lineChartData = {
        datasets: [
          {
            data: this.graph.prices,
            label: this.coin.name,
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            fill: 'origin',
          }
        ],
        labels: date
      };
    },
    (err) => console.log(err));

    this.updateCash();
    this.purchasing = this.formBuilder.group(
      {
        amount: [
          '',
          [
            Validators.required
          ]
        ]
      }
    );
    this.selling = this.formBuilder.group(
      {
        amount: [
          '',
          [
            Validators.required
          ]
        ]
      }
    );
  }

  fiatSwitch(switched:boolean): void {
    this.isInFiat = switched;
  }

  attemptPurchase(): void {
    this.reset();
    this.attemptingToPurchase = true;
  }

  attemptSell(): void {
    this.reset();
    this.attemptingToSell = true;
  }

  reset(): void {
    this.attemptingToPurchase = false;
    this.attemptingToSell = false;
    this.isBuyingSuccess = false;
    this.isSellingSuccess = false;
    this.isBuyingFailed = false;
    this.isSellingFailed = false;
  }


  softReset(): void {
    this.isBuyingSuccess = false;
    this.isSellingSuccess = false;
    this.isBuyingFailed = false;
    this.isSellingFailed = false;
  }

  sendBuyOrder(): void {
    this.softReset();
    if(this.attemptingToPurchase) {

      const amount = this.purchasing.get("amount")?.value;
      if(this.isInFiat) {
        this.service.buyCryptoInFiat(this.user.userId, amount, this.coin).subscribe(result=>
          {
            this.isBuyingSuccess = true;
            this.updateCash();
        },
        (err) => this.isBuyingFailed = true);
      } else {
        this.service.buyCrypto(this.user.userId, amount, this.coin).subscribe(result=>
          {
            this.isBuyingSuccess = true;
            this.updateCash();
        },
        (err) => this.isBuyingFailed = true);
      }
    }
  }

  sendSellOrder(): void {
    this.softReset();
    if(this.attemptingToSell) {
      const amount = this.selling.get("amount")?.value;
      if(this.isInFiat) {
        this.service.sellCryptoInFiat(this.user.userId, amount, this.coin).subscribe(result=>
          {
            this.isSellingSuccess = true;
            this.updateCash();
        },
        (err) => this.isSellingFailed = true);
      } else {
        this.service.sellCrypto(this.user.userId, amount, this.coin).subscribe(result=>
          {
            this.isSellingSuccess = true;
            this.updateCash();
        },
        (err) => this.isSellingFailed = true);
      }
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.purchasing.controls;
  }

  get n(): { [key: string]: AbstractControl } {
    return this.selling.controls;
  }

}
