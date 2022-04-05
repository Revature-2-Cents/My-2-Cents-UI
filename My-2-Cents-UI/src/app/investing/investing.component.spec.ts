import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestingComponent } from './investing.component';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { AssetExchangeService } from '../_services/assetexchange.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('InvestingComponent', () => {
  let component: InvestingComponent;
  let fixture: ComponentFixture<InvestingComponent>;
  let service : AssetExchangeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ InvestingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
