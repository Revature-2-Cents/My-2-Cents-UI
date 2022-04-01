import { TestBed } from '@angular/core/testing';

import { AssetExchangeService } from './assetexchange.service';

describe('AssetExchangeService', () => {
  let service: AssetExchangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetExchangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
