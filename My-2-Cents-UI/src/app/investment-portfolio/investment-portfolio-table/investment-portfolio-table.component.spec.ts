import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvestmentPortfolioService } from 'src/app/_services/investment-portfolio.service';

import { InvestmentPortfolioTableComponent } from './investment-portfolio-table.component';

describe('InvestmentPortfolioTableComponent', () => {
  let component: InvestmentPortfolioTableComponent;
  let fixture: ComponentFixture<InvestmentPortfolioTableComponent>;
  let service: InvestmentPortfolioService;

  class InvestmentMockService {
    getAllCryptoOrderHistoryByUser(userId: string | number | any){};
    getAllStockOrderHistoryByUser(userId: string | number | any){};
    getAllStockAssetByUser(userId: string | number | any){};
    getAllCryptoAssetByUser(userId: string | number | any){};
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentPortfolioTableComponent ],
      providers: [ {provide: InvestmentPortfolioService, useClass: InvestmentMockService} ]
    })
    .compileComponents();

    service = TestBed.inject(InvestmentPortfolioService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentPortfolioTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
