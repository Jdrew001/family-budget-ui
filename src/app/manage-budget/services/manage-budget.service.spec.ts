import { TestBed } from '@angular/core/testing';

import { ManageBudgetService } from './manage-budget.service';

describe('ManageBudgetService', () => {
  let service: ManageBudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageBudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
