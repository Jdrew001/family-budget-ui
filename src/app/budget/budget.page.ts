import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { BudgetService } from './budget.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.scss'],
})
export class BudgetPage implements OnInit, ViewDidEnter {

  get budgetSummary() { return this.budgetService.budgetSummary; }
  get categoriesForBudget() { return this.budgetService.categoriesForBudget; }

  get activeAccountName() { return this.budgetService.activeAccountName; }
  
  constructor(
    private budgetService: BudgetService
  ) { }

  ngOnInit(): void {
  }

  ionViewDidEnter(): void {
      this.budgetService.initialize();
  }

  swiperSlideChanged(event: any) {
    const activeIndex = event?.detail[0]?.activeIndex;
    if (activeIndex !== undefined) {
      this.budgetService.activeAccountName = this.budgetSummary[activeIndex]?.accountName;
    }
  }
}
