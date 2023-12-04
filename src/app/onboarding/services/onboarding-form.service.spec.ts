import { TestBed } from '@angular/core/testing';

import { OnboardingFormService } from './onboarding-form.service';

describe('OnboardingFormService', () => {
  let service: OnboardingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnboardingFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
