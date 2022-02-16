import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { My2CentsService } from './my2-cents.service';

describe('My2CentsService', () => {
  let service: My2CentsService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(My2CentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
