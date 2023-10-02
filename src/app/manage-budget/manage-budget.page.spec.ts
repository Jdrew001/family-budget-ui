import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageBudgetPage } from './manage-budget.page';

describe('ManageBudgetPage', () => {
  let component: ManageBudgetPage;
  let fixture: ComponentFixture<ManageBudgetPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ManageBudgetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
