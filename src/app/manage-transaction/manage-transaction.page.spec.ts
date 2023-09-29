import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageTransactionPage } from './manage-transaction.page';

describe('ManageTransactionPage', () => {
  let component: ManageTransactionPage;
  let fixture: ComponentFixture<ManageTransactionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ManageTransactionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
