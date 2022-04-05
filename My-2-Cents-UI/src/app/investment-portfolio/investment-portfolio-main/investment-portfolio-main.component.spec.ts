import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentPortfolioMainComponent } from './investment-portfolio-main.component';

describe('InvestmentPortfolioMainComponent', () => {
  let component: InvestmentPortfolioMainComponent;
  let fixture: ComponentFixture<InvestmentPortfolioMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentPortfolioMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentPortfolioMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
