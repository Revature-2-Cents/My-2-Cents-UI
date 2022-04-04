import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InvestmentPortfolioService } from 'src/app/_services/investment-portfolio.service';

import { OrderHistoryComponent } from './order-history.component';

describe('OrderHistoryComponent', () => {
  let component: OrderHistoryComponent;
  let fixture: ComponentFixture<OrderHistoryComponent>;
  let service: InvestmentPortfolioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderHistoryComponent ],
      providers: [{provide: InvestmentPortfolioService}],
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
});
