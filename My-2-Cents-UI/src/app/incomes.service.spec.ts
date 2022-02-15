import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { IncomesService } from './incomes.service';

describe('IncomesService', () => {
  let service: IncomesService;
  let fakeHttp: any;

  beforeEach(() => {
    fakeHttp = {
      get() { }
    };



    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: fakeHttp }], 
    });
    service = TestBed.inject(IncomesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
