import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { SummaryService } from './summary.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ViewDidEnter } from '@ionic/angular';
import { CoreService } from '../core/services/core.service';
import { ManageTransactionPage } from '../manage-transaction/manage-transaction.page';
import * as _ from 'lodash';
import { ManageBudgetPage } from '../manage-budget/manage-budget.page';
import { CircleGuageConstant } from '../shared/constants/circle-guage.constant';
import { CircleGaugeComponent } from '../shared/components/circle-gauge/circle-gauge.component';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit, ViewDidEnter {

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

  ngOnInit() {
    this.handleNavigation();
    
  }

  handleNavigation() {
    this.coreService.$showManageTransaction.subscribe(async (value: any) => {
      const val = value?.data;
      if (value.show) {
        const modal = await this.modalController.create({
          component: ManageTransactionPage,
          componentProps: {
            accounts: _.cloneDeep(this.accountBalanceSummary)
          }
        });

        modal.present();
        const { data } = await modal.onWillDismiss();
        if (data && data?.refresh) {
          this.summaryService.getSummaryData();
        }
      }
   });
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

  onSeeMore() {
    console.log('See more clicked');
  }

}
