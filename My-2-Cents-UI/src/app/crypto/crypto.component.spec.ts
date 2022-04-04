import { observable, Observable } from 'rxjs';
import { AssetExchangeService } from './../_services/assetexchange.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CryptoComponent } from './crypto.component';
import { MarketCoin } from '../_models/marketcoin.model';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ReactiveFormsModule } from '@angular/forms';


describe('CryptoComponent', () => {
  let component: CryptoComponent;
  let fixture: ComponentFixture<CryptoComponent>;
  let service : AssetExchangeService;

  let dummyCryptoDatabase:MarketCoin[] = [
    {
      cryptoId: 52,
      imageURL: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
      name: "Bitcoin",
      shortenedName: "btc",
      currentPrice: 46536.00000000,
      priceChange: 420.37000000,
      priceChangePercentage: 0.91155
    }
  ];

  class CryptoMockService{
   loadCrypto(){return new Observable((observable) =>{observable.next(dummyCryptoDatabase)})};
   buyCrypto(userID:number, amount:number, coin:MarketCoin){};
   sellCrypto(userID:number, amount:number, coin:MarketCoin){};
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [ CryptoComponent ],
      providers:[{provide:AssetExchangeService, useClass : CryptoMockService}]
    })
    .compileComponents();
    service = TestBed.inject(AssetExchangeService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should fetch loadCrypto() async data' , async())
});
