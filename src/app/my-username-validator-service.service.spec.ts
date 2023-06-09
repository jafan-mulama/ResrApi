import { TestBed } from '@angular/core/testing';

import { MyUsernameValidatorServiceService } from './my-username-validator-service.service';

describe('MyUsernameValidatorServiceService', () => {
  let service: MyUsernameValidatorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyUsernameValidatorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
