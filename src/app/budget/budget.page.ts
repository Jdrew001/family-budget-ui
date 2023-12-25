import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { BudgetService } from './budget.service';
import { CoreService } from '../core/services/core.service';
import { TransactionType } from '../core/models/transaction-type.model';
import { ManageBudgetPage } from '../manage-budget/manage-budget.page';
import { ManageCategoryPage } from '../manage-category/manage-category.page';
import { loadingContentAnimation } from '../shared/animations/loading-animation';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.scss'],
  animations: [loadingContentAnimation]
})
export class BudgetPage implements OnInit, ViewDidEnter, ViewDidLeave {

  get budgetSummary() { return this.budgetService.budgetSummary; }
  get categoriesForBudget() { return this.budgetService.categoriesForBudget; }

  get currentBudget() { return this.budgetService.currentBudget; }
  get pageInitialized() { return this.budgetService.pageInitialized; }

  budgetCategoryRefData: Array<{id: string, name: string, type: TransactionType}> = [];

  transactionType = TransactionType;
  placeholderBudgetSummary = [{}];
  placeholderCategories = [{}, {}, {}, {}, {}, {}, {}, {}];

  constructor(
    private budgetService: BudgetService,
    private modalController: ModalController,
    private coreService: CoreService
  ) { }

  ngOnInit(): void {
    this.coreService.$shouldRefreshScreen.subscribe((value: boolean) => {
      if (value) {
        this.budgetService.resetBudget();
        setTimeout(() => {
          this.budgetService.initialize();
        }, 100)
      }
    });
  }

  ionViewDidEnter(): void {
    this.budgetService.initialize();
  }

  ionViewDidLeave(): void {
    this.budgetService.resetBudget();
  }

  async editBudget() {
    const modal = await this.modalController.create({
      component: ManageBudgetPage,
      componentProps: {
        budget: this.currentBudget?.id
      }
    });

    modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.budgetService.resetBudget();
      setTimeout(() => {
        this.budgetService.initialize();
      }, 100);
    }
    
  }

  swiperSlideChanged(event: any) {
    const activeIndex = event?.detail[0]?.activeIndex;
    if (activeIndex !== undefined) {
      this.budgetService.currentBudget.accountName = this.budgetSummary[activeIndex]?.accountName;
    }
  }
}
