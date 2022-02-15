import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IncomesService } from './incomes.service';

describe('IncomesService', () => {
  let service: IncomesService;
  let httoMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(IncomesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
