import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { observable, Observable } from 'rxjs';
import { CryptoOrder, StockOrder } from 'src/app/_models/investmentPortfolio';
import { InvestmentPortfolioService } from 'src/app/_services/investment-portfolio.service';

import { OrderHistoryComponent } from './order-history.component';

describe('OrderHistoryComponent', () => {
  let component: OrderHistoryComponent;
  let fixture: ComponentFixture<OrderHistoryComponent>;
  let service: InvestmentPortfolioService;

  let mockStockOrder:StockOrder[] = [
    {
      name: "testing",
      currentInvestment: 100,
      initialInvestmentDate: "04/02/2022",
      ownedShares: 10,
      transactionType: "Buy"
    }
  ];

  let mockCryptoOrder:CryptoOrder[] = [
    {
      name: "testing",
      currentInvestment: 100,
      initialInvestmentDate: "04/02/2022",
      ownedShares: 10,
      transactionType: "Buy"
    }
  ];

  class InvestmentPortfolioHistoryMockService {
    getAllStockOrderHistoryByUser(userId: number) {
      return new Observable((observable) => {
        observable.next(mockStockOrder)
      })
    };

    getAllCryptoOrderHistoryByUser(userId: number) {
      return new Observable((observable) => {
        observable.next(mockCryptoOrder)
      })
    };
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderHistoryComponent ],
      providers: [{provide: InvestmentPortfolioService, useClass: InvestmentPortfolioHistoryMockService}],
      imports: [ RouterTestingModule, HttpClientTestingModule ]
    })
    .compileComponents();
    service = TestBed.inject(InvestmentPortfolioService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get stock order history by user', () => {
    component.getAllStockOrderHistoryByUser(1);
    expect(component.listOfStockOrders).toEqual(mockStockOrder);
  });

  it('should get crypto order history by user', () => {
    component.getAllStockOrderHistoryByUser(1);
    expect(component.listOfCryptoOrders).toEqual(mockCryptoOrder);
  });

});
