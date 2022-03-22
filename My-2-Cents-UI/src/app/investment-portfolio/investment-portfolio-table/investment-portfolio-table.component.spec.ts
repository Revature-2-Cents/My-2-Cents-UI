import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentPortfolioTableComponent } from './investment-portfolio-table.component';

describe('InvestmentPortfolioTableComponent', () => {
  let component: InvestmentPortfolioTableComponent;
  let fixture: ComponentFixture<InvestmentPortfolioTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentPortfolioTableComponent ]
    })
    .compileComponents();
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
