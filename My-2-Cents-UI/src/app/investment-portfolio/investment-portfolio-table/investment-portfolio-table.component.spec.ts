import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { observable, Observable, ReplaySubject } from 'rxjs';
import { InvestmentPortfolioService } from 'src/app/_services/investment-portfolio.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { InvestmentPortfolioTableComponent } from './investment-portfolio-table.component';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '../../_models/User';
import { CryptoAsset, StockAsset, TotalInvestment } from '../../_models/investmentPortfolio';

describe('InvestmentPortfolioTableComponent', () => {
  let component: InvestmentPortfolioTableComponent;
  let fixture: ComponentFixture<InvestmentPortfolioTableComponent>;
  let service: InvestmentPortfolioService;
  //let service1: AccountService;
  

  /*class InvestmentMockService {
    getAllCryptoOrderHistoryByUser(userId: string | number | any){};
    getAllStockOrderHistoryByUser(userId: string | number | any){};
    getAllStockAssetByUser(userId: string | number | any){};
    getAllCryptoAssetByUser(userId: string | number | any){};
  }*/

  // let userInfo:User = {
  //   email: "testing@gmail.com",
  //   token: "NOPANFOPNQ PNDFPQPNFQNPFNPNPQNPN PQNFP NPQNF",
  //   userId: 1,
  //   userName: "testing"
  // }

  let mockCryptoAsset:CryptoAsset[] = [
    {
      currentInvestment: 10,
      initialInvestmentDate: "test",
      name: "testing",
      ownedShares: 10,
      returns: 10,
      sharePrice: 10,
      cryptoPrice: 10
    }
  ];

  let mockStockAsset:StockAsset[] = [
    {
      currentInvestment: 10,
      initialInvestmentDate: "test",
      name: "testing",
      ownedShares: 10,
      returns: 10,
      sharePrice: 10,
      stockPrice: 10
    }
  ]

  let MockTotalInvestment:TotalInvestment = {
    userInvestmentSum: 10
  }
  
  class InvestmentPortfolioMockService {
    getAllStockAssetByUser(userId: number) {
      return new Observable((observable) => {
        observable.next(mockStockAsset)
      })
    };

    getAllCryptoAssetByUser(userId: number) {
      return new Observable((observable) => {
        observable.next(mockCryptoAsset)
      })
    };

    getTotalInvestmentByUser(userId: number) {
      return new Observable((observable) => {
        observable.next(MockTotalInvestment)
      })
    };
  }

  // class AccountMockService {
  //   private currentUserSource = new ReplaySubject<User>(1);
  //   currentUser = this.currentUserSource.asObservable();
    
  //   setCurrentUser(user: User) {
  //     const token = this.getDecodeToken(user.token);
  //     this.currentUserSource.next(userInfo);
  //   }
  
  //   getDecodeToken(token){
  //     return JSON.parse(atob(token.split('.')[1]));
  //   }
  // }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentPortfolioTableComponent ],
      providers: [{provide: InvestmentPortfolioService, useClass: InvestmentPortfolioMockService}],
      imports: [ RouterTestingModule, HttpClientTestingModule ]
    })
    .compileComponents();
    //{provide: InvestmentPortfolioService, useClass: InvestmentMockService}

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

  it('should get crypto assests by user', () => {
    
    component.getAllCryptoAssetsByUser(1);
    expect(component.listOfCryptoAssets).toEqual(mockCryptoAsset);
  });


  /*it('should call ngOnInit', () => {
    const fixture = TestBed.createComponent(InvestmentPortfolioTableComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(InvestmentPortfolioService);
    let userId:number;
    component.ngOnInit();
    expect(component.Items).toEqual(userId);
  })*/
});
