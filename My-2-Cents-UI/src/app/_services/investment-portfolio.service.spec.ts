import { TestBed } from '@angular/core/testing';

import { InvestmentPortfolioService } from './investment-portfolio.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CryptoAsset, StockAsset } from 'src/app/_models/investmentPortfolio';

describe('InvestmentPortfolioService', () => {
  let service: InvestmentPortfolioService;
  let httpMock: HttpTestingController;

  let dummyCrypto:CryptoAsset[] = [
    {
      name: "Bitcoin",
      initialInvestmentDate: "03/31/2022",
      currentInvestment: 100,
      ownedShares: 2,
      sharePrice: 50,
      returns: 3,
      cryptoPrice: 300
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        InvestmentPortfolioService
      ]
    });
    service = TestBed.inject(InvestmentPortfolioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get crypto assets', () => {
    service.getAllCryptoAssetByUser(1).subscribe((response) => {
      expect(response[0].name.toBe(dummyCrypto[0].name));
    });

    const httpReq = httpMock.expectOne("https://localhost:7106/api/CryptoPortfolio/GetCryptoAssetTable?_userID=1");
    expect(httpReq.request.method).toBe("GET");
    httpReq.flush(dummyCrypto);
  });
});
