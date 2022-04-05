import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CryptoAsset, StockAsset, TotalInvestment } from 'src/app/_models/investmentPortfolio';
import { User } from 'src/app/_models/User';
import { AccountService } from 'src/app/_services/account.service';
import { InvestmentPortfolioService } from 'src/app/_services/investment-portfolio.service';

@Component({
  selector: 'app-investment-portfolio-table',
  templateUrl: './investment-portfolio-table.component.html',
  styleUrls: ['./investment-portfolio-table.component.css']
})
export class InvestmentPortfolioTableComponent implements OnInit {
  user = <User>{};
  listOfStockAssets: StockAsset[];
  listOfCryptoAssets: CryptoAsset[];
  totalInvestment: TotalInvestment;
  //userId: number;


  constructor(
    private accountService: AccountService,
    private investmentPortfolioServce: InvestmentPortfolioService,
    private http: HttpClient,
    private router: Router) {
    this.accountService.currentUser.pipe(take(1)).subscribe((data) => this.user = data);
    this.investmentPortfolioServce.getTotalInvestmentByUser(this.user.userId).subscribe(result => {
      this.totalInvestment = result;
      console.log(result);
    });
  }

  ngOnInit(): void {
    this.getAllStockAssetsByUser(this.user.userId);
    this.getAllCryptoAssetsByUser(this.user.userId);
  }
  //jasmine
  getAllStockAssetsByUser(userId) {
    this.investmentPortfolioServce.getAllStockAssetByUser(userId).subscribe(result => {
      this.listOfStockAssets = result;
      console.log(result);
    });
  }
  //vijhan
  getAllCryptoAssetsByUser(userId) {
    this.investmentPortfolioServce.getAllCryptoAssetByUser(userId).subscribe(result => {
      this.listOfCryptoAssets = result;
      console.log(result);
    });
  }




}
