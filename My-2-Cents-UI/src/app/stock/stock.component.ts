import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Stock } from '../_models/stock.model';
import { User } from '../_models/User';
import { ChartConfiguration, ChartType } from 'chart.js';
import { GraphStock } from '../_models/graphstock.model';
import { AssetExchangeService } from '../_services/assetexchange.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs';
import { My2CentsService } from '../_services/my2-cents.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: [
    "../../../node_modules/bootstrap/dist/css/bootstrap.css",
    './stock.component.css']
})
export class StockComponent implements OnInit {

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

  stockName:string | null = "No Stock Selected";
  stock: Stock;
  user: User;
  currentCash: number;

  @Input() Stock = <Stock>{};

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

  constructor(private router:ActivatedRoute, private formBuilder: FormBuilder, private account:AccountService, public service:AssetExchangeService, private cents:My2CentsService) {
    this.stock = {
      stockId: 0,
      currentPrice: 0,
      priceChange: 0,
      priceChangePercentage: 0,
      name: '',
      shortenedName: '',
      lastUpdate: ''
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
  }

  updateCash(): void
  {
    this.cents.getUserAccounts(this.user.userId).subscribe(res => this.currentCash = res[0].totalBalance);
  }

  ngOnInit(): void {
    this.account.currentUser.pipe(take(1)).subscribe((data) => this.user = data);

    this.stockName = this.Stock.shortenedName;
    let headers = new HttpHeaders();

    this.service
    .loadStock()
    .subscribe((res) => {
      res.forEach(r => {
        if (r.shortenedName = this.stockName) {
          this.stock = r;
        }
      });
    },
    (err) => console.log(err));

    this.service
    .loadDailyStockChart(this.stockName)
    .subscribe((res) => {
      var time = res.chart.result[0].timestamp;
      var date: string[] = [];
      time.forEach(function(t) {
          var read = new Date(t*1000).toDateString();
          date.push(read);
      });
      this.lineChartData = {
        datasets: [
          {
            data: res.chart.result[0].indicators.quote[0].close,
            label: this.stockName,
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

  convertDecimal(num:number) {
    return Math.round(num * 100) / 100;
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
        this.service.buyStockInFiat(this.user.userId, amount, this.stock).subscribe(result=>
          {
            this.isBuyingSuccess = true;
            this.updateCash();
        },
        (err) => this.isBuyingFailed = true);
      } else {
        this.service.buyStock(this.user.userId, amount, this.stock).subscribe(result=>
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
        this.service.sellStockInFiat(this.user.userId, amount, this.stock).subscribe(result=>
          {
            this.isSellingSuccess = true;
            this.updateCash();
        },
        (err) => this.isSellingFailed = true);
      } else {
        this.service.sellStock(this.user.userId, amount, this.stock).subscribe(result=>
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
