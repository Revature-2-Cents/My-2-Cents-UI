import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CrytoOrder, StockOrder } from 'src/app/_models/investmentPortfolio';
import { User } from 'src/app/_models/User';
import { AccountService } from 'src/app/_services/account.service';
import { InvestmentPortfolioService } from 'src/app/_services/investment-portfolio.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  user: User;
  listOfCryptoOrders: CrytoOrder[];
  listOfStockOrders: StockOrder[];
  userId: number;

  constructor(private route: ActivatedRoute,
              private accountService: AccountService,
              private investmentPortfolioServce: InvestmentPortfolioService, 
              private http: HttpClient, 
              private router: Router) {
                this.accountService.currentUser.pipe(take(1)).subscribe(user => this.user = user)
               }

  ngOnInit(): void {
    this.getAllCryptoOrderHistoryByUser(this.user.userId);
    this.getAllStockOrderHistoryByUser(this.user.userId);
    
  }
  
  getAllCryptoOrderHistoryByUser(userId){
    this.investmentPortfolioServce.getAllCryptoOrderHistoryByUser(userId).subscribe(result => {
      this.listOfCryptoOrders = result;
      console.log(result);
    });
    
  }
  getAllStockOrderHistoryByUser(userId){
    this.investmentPortfolioServce.getAllStockOrderHistoryByUser(userId).subscribe(result => {
      this.listOfStockOrders = result;
      console.log(result);
    });
    
  }
}
