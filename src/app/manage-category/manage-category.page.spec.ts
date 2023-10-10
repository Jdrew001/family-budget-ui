import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageCategoryPage } from './manage-category.page';

describe('ManageCategoryPage', () => {
  let component: ManageCategoryPage;
  let fixture: ComponentFixture<ManageCategoryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ManageCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
