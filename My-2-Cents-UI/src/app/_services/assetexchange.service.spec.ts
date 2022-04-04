import { MarketCoin } from './../_models/marketcoin.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AssetExchangeService } from './assetexchange.service';

describe('AssetExchangeService', () => {
  let service: AssetExchangeService;
  let httpMock:HttpTestingController;
  let dummyCryptoDatabase:MarketCoin[] = [
    {
      cryptoId: 52,
      imageURL: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
      name: "Bitcoin",
      shortenedName: "btc",
      currentPrice: 46536.00000000,
      priceChange: 420.37000000,
      priceChangePercentage: 0.91155,
      cryptoNameId:"bitcoin"
    }
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers:[
        AssetExchangeService
      ]
    });
    service = TestBed.inject(AssetExchangeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should load crypto from the database', ()=>{
     service.loadCrypto().subscribe((response)=>{
       expect(response[0].name).toBe(dummyCryptoDatabase[0].name);
     });
     //Mocking the particular url if the service tries to communicate
    const httpReq = httpMock.expectOne("https://localhost:7106/api/InvestmentPlatform/GetCrypto");
    expect(httpReq.request.method).toBe("GET");//thie checkes the get method
    httpReq.flush(dummyCryptoDatabase);//guarantee on http resonse holds the dummyCryptoDatabase
  });
});
