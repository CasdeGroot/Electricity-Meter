import { TestBed, inject } from '@angular/core/testing';

import { ElectricitymeterService } from './electricitymeter.service';

describe('ElectricitymeterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElectricitymeterService]
    });
  });

  it('should be created', inject([ElectricitymeterService], (service: ElectricitymeterService) => {
    expect(service).toBeTruthy();
  }));
});
