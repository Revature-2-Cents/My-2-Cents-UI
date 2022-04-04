import { RouterTestingModule } from '@angular/router/testing';
import { Stock } from './../_models/stock.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { AssetExchangeService } from '../_services/assetexchange.service';

import { StockComponent } from './stock.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StockComponent', () => {
  let component: StockComponent;
  let fixture: ComponentFixture<StockComponent>;
  let service : AssetExchangeService;

   let dummyStockDatabase:Stock[] = [
    {
     StockID :1,
     CurrentPrice:352.00000000,
     Name:"Microsoft",
     ShortName:"MSFT",
     PriceChange:0.00000000,
     PriceChangePercentage:0
   
    }
  ];

   class StockMockService{
    loadStock(){return new Observable((observable) =>{observable.next(dummyStockDatabase)})};
    getStockByName(stockName:string|null){};
   }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ StockComponent ],
      providers :[{provide:AssetExchangeService, useClass : StockMockService}]
    })
    .compileComponents();
    service = TestBed.inject(AssetExchangeService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
