import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SummaryService } from './summary.service';
import { ModalController, ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { CoreService } from '../core/services/core.service';
import * as _ from 'lodash';
import { ManageBudgetPage } from '../manage-budget/manage-budget.page';
import { CircleGuageConstant } from '../shared/constants/circle-guage.constant';
import { ManageTransactionPage } from '../manage-transaction/manage-transaction.page';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit, ViewDidEnter, ViewDidLeave {

  @ViewChild('slider') slider: ElementRef = {} as ElementRef;

  configTest = CircleGuageConstant.CONFIG;

  get currentBudgetSummary() { return this.summaryService.currentBudgetSummary; }
  get accountBalanceSummary() { return this.summaryService.accountBalanceSummary; }
  get transactionSummary() { return this.summaryService.transactionSummary; }

  constructor(
    public summaryService: SummaryService,
    private modalController: ModalController,
    private coreService: CoreService,
  ) {
  }

  ionViewDidEnter(): void {
    this.summaryService.getSummaryData();
  }

  ionViewDidLeave(): void {
    this.summaryService.resetSummaryData();
  }

  ngOnInit() {
    this.handleNavigation();
    this.coreService.$shouldRefreshScreen.subscribe((value: boolean) => {
      if (value) {
        this.summaryService.resetSummaryData();
        setTimeout(() => {
          this.summaryService.getSummaryData();
        }, 100)
      }
    })
  }

  handleNavigation() {
    
  }

  handleAccountAction(id: string) {
    this.summaryService.accountId = id;
    // we now should call get info
    this.summaryService.getAccountBudgetTransactions();
    this.accountBalanceSummary.forEach(item => {
      if (item.id === id) item.active = true;
      else item.active = false;
    });
  }

  async manageUnsetBudget() {
    const modal = await this.modalController.create({
      component: ManageBudgetPage,
      componentProps: {
        budget: this.currentBudgetSummary.id
      }
    });

    modal.present();
    // handle when the modal is dissmissed
  }

  async handleTransactionClick(id: string) {
    const modal = await this.modalController.create({
      component: ManageTransactionPage,
      componentProps: {
        transactionId: id,
        accounts: this.accountBalanceSummary
      }
    });

    modal.present();
    // const { data } = await modal.onWillDismiss();
    // if (data && data?.refresh) {
    //   this.summaryService.getSummaryData();
    // }
  }

}
