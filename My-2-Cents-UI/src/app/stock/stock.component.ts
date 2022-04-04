import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Stock } from '../_models/stock.model';
import { User } from '../_models/User';
import { ChartConfiguration, ChartType } from 'chart.js';
import { GraphStock } from '../_models/graphstock.model';
import { AssetExchangeService } from '../_services/assetexchange.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  stockName:string | null = "No Stock Selected";
  stock: Stock;

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

  @Input() userId: number = -1;

  @Input() User = <User>{};

  constructor(private router:ActivatedRoute, public service:AssetExchangeService) {
    this.stock = {
      // symbol: '',
      // marketCap: 0,
      // longName: '',
      // name: '',
      // regularMarketPrice: 0,
      // regularMarketChange: 0,
      // regularMarketChangePercent: 0,
      // regularMarketDayHigh: 0,
      // regularMarketDayLow: 0,
      // regularMarketVolume: 0,
      // fiftyTwoWeekLowChange: 0,
      // fiftyTwoWeekLowChangePercent: 0,
      // fiftyTwoWeekRange: 0,
      // fiftyTwoWeekHighChange: 0,
      // fiftyTwoWeekHighChangePercent: 0,
      // fiftyTwoWeekLow: 0,
      // fiftyTwoWeekHigh: 0
      
    //  StockID :1,
    //  CurrentPrice:352.00000000,
    //  Name:"Microsoft",
    //  ShortName:"MSFT",
    //  PriceChange:0.00000000,
    //  PriceChangePercentage:0
   
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

  ngOnInit(): void {
    this.stockName = this.router.snapshot.paramMap.get("stockname");
    let headers = new HttpHeaders();

    this.service
    .getStockByName(this.stockName)
    .subscribe((res) => {
      this.stock = res["quoteResponse"].result[0];
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
  }

  convertDecimal(num:number) {
    return Math.round(num * 100) / 100;
  }

  attemptPurchase(): void {

  }

  attemptSell(): void {

  }

}
