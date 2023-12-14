import { Component, OnInit } from '@angular/core';
import { TransactionService } from './transaction.service';
import { InfiniteScrollCustomEvent, ModalController, ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { ManageTransactionPage } from '../manage-transaction/manage-transaction.page';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit, ViewDidEnter, ViewDidLeave {
  
  get accountBalanceSummary() { return this.transactionService.accountBalanceSummary; }
  get groupedTransactions() { return this.transactionService.groupTransactions; }

  scrollDisabled: boolean = false;

  constructor(
    private transactionService: TransactionService,
    private modalController: ModalController
  ) { }

  ionViewDidEnter(): void {
    this.transactionService.accountBalanceSummary = [];
    this.transactionService.groupTransactions = [];
    this.fetchTransactionGroups();
    this.scrollDisabled = false;
  }

  ionViewDidLeave(): void {
    this.transactionService.accountBalanceSummary = [];
    this.transactionService.groupTransactions = [];
    this.transactionService.page = 1;
    this.scrollDisabled = true;
  }

  ngOnInit() {
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
