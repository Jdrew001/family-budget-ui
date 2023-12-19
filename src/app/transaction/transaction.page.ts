import { Component, OnInit } from '@angular/core';
import { TransactionService } from './transaction.service';
import { InfiniteScrollCustomEvent, ModalController, ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { ManageTransactionPage } from '../manage-transaction/manage-transaction.page';
import { CoreService } from '../core/services/core.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit, ViewDidEnter, ViewDidLeave {
  
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

  ionViewDidLeave(): void {
    this.resetView();
  }

  resetView() {
    this.transactionService.accountBalanceSummary = [];
    this.transactionService.groupTransactions = [];
    this.transactionService.page = 1;
    this.scrollDisabled = true;
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
