import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, ViewDidEnter } from '@ionic/angular';
import { BudgetService } from './budget.service';
import { CoreService } from '../core/services/core.service';
import { TransactionType } from '../core/models/transaction-type.model';
import { ManageBudgetPage } from '../manage-budget/manage-budget.page';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.scss'],
})
export class BudgetPage implements OnInit, ViewDidEnter {

  get budgetSummary() { return this.budgetService.budgetSummary; }
  get categoriesForBudget() { return this.budgetService.categoriesForBudget; }

  get currentBudget() { return this.budgetService.currentBudget; }

  budgetCategoryRefData: Array<{id: string, name: string, type: TransactionType}> = [];
  
  constructor(
    private budgetService: BudgetService,
    private modalController: ModalController,
  ) { }

  ngOnInit(): void {
  }

  ionViewDidEnter(): void {
      this.budgetService.initialize();
  }

  async editBudget() {
    const modal = await this.modalController.create({
      component: ManageBudgetPage,
      componentProps: {
        budget: this.currentBudget?.id
      }
    });

    modal.present();
  }

  swiperSlideChanged(event: any) {
    const activeIndex = event?.detail[0]?.activeIndex;
    if (activeIndex !== undefined) {
      this.budgetService.currentBudget.accountName = this.budgetSummary[activeIndex]?.accountName;
    }
  }
}
