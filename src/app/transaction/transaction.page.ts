import { Component, OnInit } from '@angular/core';
import { TransactionService } from './transaction.service';
import { InfiniteScrollCustomEvent, ModalController, ViewDidEnter, ViewWillLeave } from '@ionic/angular';
import { ManageTransactionPage } from '../manage-transaction/manage-transaction.page';
import { CoreService } from '../core/services/core.service';
import { loadingContentAnimation } from '../shared/animations/loading-animation';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
  animations: [loadingContentAnimation]
})
export class TransactionPage implements OnInit, ViewDidEnter, ViewWillLeave {
  
  get accountBalanceSummary() { return this.transactionService.accountBalanceSummary; }
  get groupedTransactions() { return this.transactionService.groupTransactions; }

  get pageInitialized() { return this.transactionService.pageInitialized; }

  scrollDisabled: boolean = false;

  placeHolderAccounts = [{}, {}];
  placeHolderTransactions = [{}, {}, {}, {}];

  constructor(
    private transactionService: TransactionService,
    private modalController: ModalController,
    private coreService: CoreService
  ) { }

  ionViewDidEnter(): void {
    this.transactionService.accountBalanceSummary = [];
    this.transactionService.groupTransactions = [];
    this.fetchTransactionGroups();
    this.scrollDisabled = false;
  }

  ionViewWillLeave(): void {
    this.resetView();
  }

  resetView() {
    this.transactionService.accountBalanceSummary = [];
    this.transactionService.groupTransactions = [];
    this.transactionService.page = 1;
    this.transactionService.pageInitialized = false;
  }

  ngOnInit() {
    this.coreService.$shouldRefreshScreen.subscribe((value: boolean) => {
      this.resetView();
      setTimeout(() => {
        this.fetchTransactionGroups();
      }, 100);
    });
  }

  fetchTransactionGroups() {
    this.transactionService.initialize();
  }

  async handleTransactionClicked(id: string) {
    const modal = await this.modalController.create({
      component: ManageTransactionPage,
      componentProps: {
        transactionId: id,
        accounts: this.accountBalanceSummary
      }
    });

    modal.present();
  }

  handleAccountAction(id: any) {
    
  }

  onIonInfinite(event: any) {
    this.transactionService.getTransactionGroups(event);
  }

}
