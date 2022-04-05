import { RouterTestingModule } from '@angular/router/testing';
import { Stock } from './../_models/stock.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { AssetExchangeService } from '../_services/assetexchange.service';

import { StockComponent } from './stock.component';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('StockComponent', () => {
  let component: StockComponent;
  let fixture: ComponentFixture<StockComponent>;
  let service : AssetExchangeService;

   let dummyStockDatabase:Stock[] = [
    {
     stockId :1,
     currentPrice:352.00000000,
     name:"Microsoft",
     shortenedName:"MSFT",
     priceChange:0.00000000,
     priceChangePercentage:0,
    lastUpdate: "2022-03-22 01:10:00.000"
   
    }
  ];

   class StockMockService{
    loadStock(){return new Observable((observable) =>{observable.next(dummyStockDatabase)})};
    getStockByName(stockName:string|null){};
    loadDailyStockChart(stockName:string|null){return new Observable((observable) =>{observable.next(dummyStockDatabase)})};
   }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule
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
