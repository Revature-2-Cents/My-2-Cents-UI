import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { StockAsset } from 'src/app/_models/investmentPortfolio';
import { User } from 'src/app/_models/User';
import { AccountService } from 'src/app/_services/account.service';
import { InvestmentPortfolioService } from 'src/app/_services/investment-portfolio.service';


// export const INVESTMENTPORTFOLIO_STOCKS_DATA: InvestmentPortfolio[] = [
//   { name: 'APPLE', investmentBuyDate: new Date('2010-12-10'), amountInvested: 10000.00, sharesOwned: 300, pricePerShare: 10.00, gainsLoss: 10.00, dollarValue: 50.00 },
//   { name: 'GOOGLE', investmentBuyDate: new Date(2010 / 12 / 9), amountInvested: 10000.00, sharesOwned: 654, pricePerShare: 10.00, gainsLoss: 10.00, dollarValue: 50.00 },
//   { name: 'META', investmentBuyDate: new Date(2010 / 12 / 10), amountInvested: 10000.00, sharesOwned: 300, pricePerShare: 10.00, gainsLoss: 10.00, dollarValue: 50.00 },
//   { name: 'AMAZON', investmentBuyDate: new Date(2010 / 12 / 10), amountInvested: 10000.00, sharesOwned: 300, pricePerShare: 10.00, gainsLoss: 10.00, dollarValue: 50.00 },
// ];

// export const INVESTMENTPORTFOLIO_CRYTO_DATA: InvestmentPortfolio[] = [
//   { name: 'BITCOIN', investmentBuyDate: new Date(2010 / 12 / 10), amountInvested: 10000.00, sharesOwned: 300, pricePerShare: 10.00, gainsLoss: 10.00, dollarValue: 50.00 },
//   { name: 'SHIBA', investmentBuyDate: new Date(2010 / 12 / 10), amountInvested: 10000.00, sharesOwned: 654, pricePerShare: 10.00, gainsLoss: 10.00, dollarValue: 50.00 },
//   { name: 'DOGE', investmentBuyDate: new Date(2010 / 12 / 10), amountInvested: 10000.00, sharesOwned: 300, pricePerShare: 10.00, gainsLoss: 10.00, dollarValue: 50.00 },
//   { name: 'ETHEREUM', investmentBuyDate: new Date(2010 / 12 / 10), amountInvested: 10000.00, sharesOwned: 300, pricePerShare: 10.00, gainsLoss: 10.00, dollarValue: 50.00 },
// ];

@Component({
  selector: 'app-investment-portfolio-table',
  templateUrl: './investment-portfolio-table.component.html',
  styleUrls: ['./investment-portfolio-table.component.css']
})
export class InvestmentPortfolioTableComponent implements OnInit {
user: User;
listOfStockAssets: StockAsset[];
userId: number;

  constructor(private route: ActivatedRoute,
    private accountService: AccountService,
    private investmentPortfolioServce: InvestmentPortfolioService, 
    private http: HttpClient, 
    private router: Router) { 
      this.accountService.currentUser.pipe(take(1)).subscribe(user => this.user = user)
    } 
    
    ngOnInit(): void {
      this.getAllStockAssetsByUser(this.user.userId);
    }

    getAllStockAssetsByUser(userId){
      this.investmentPortfolioServce.getAllStockAssetByUser(userId).subscribe(result => {
        this.listOfStockAssets = result;
        console.log(result);
      });
}


}
