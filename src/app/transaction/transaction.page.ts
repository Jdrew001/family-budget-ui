import { Component, OnInit } from '@angular/core';
import { TransactionService } from './transaction.service';
import { InfiniteScrollCustomEvent, ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit, ViewDidEnter {
  
  get accountBalanceSummary() { return this.transactionService.accountBalanceSummary; }
  get groupedTransactions() { return this.transactionService.groupTransactions; }

  constructor(
    private transactionService: TransactionService
  ) { }

  ionViewDidEnter(): void {
    this.transactionService.accountBalanceSummary = [];
    this.transactionService.groupTransactions = [];
    this.fetchTransactionGroups();
  }

  ngOnInit() {
  }

  fetchTransactionGroups() {
    this.transactionService.initialize();
  }

  handleAccountAction(id: any) {
    
  }

  onIonInfinite(event: any) {
    this.transactionService.getTransactionGroups(event);
  }

}
