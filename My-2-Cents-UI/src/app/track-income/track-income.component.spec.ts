import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { TrackIncomeComponent } from './track-income.component';
import { ActivatedRoute } from '@angular/router';
import { IncomesService } from '../_services/incomes.service';
import * as Rx from 'rxjs';
import { delay } from "rxjs/operators";
import { Incomes } from '../_models/mock-incomes'


describe('TrackIncomeComponent', () => {
  let component: TrackIncomeComponent;
  let fixture: ComponentFixture<TrackIncomeComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackIncomeComponent ],

      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [{ provide: IncomesService, useValue: { getAccountInfo() { } } },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: {get:(AccountID:number)=>{AccountID:1}}}  }}
      ], 
    })
    .compileComponents();    
  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(TrackIncomeComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });


  it('should call ngOnInit', () => {
    const fixture = TestBed.createComponent(TrackIncomeComponent);
    const component = fixture.debugElement.componentInstance;    
    const service = fixture.debugElement.injector.get(IncomesService);    
    let a:Incomes[]=[];
    let spy_getAccountInfo = spyOn(service,"getAccountInfo").and.returnValue(Promise.resolve(a));
    component.ngOnInit();
    expect(component.Items).toEqual([]);
  })



});
