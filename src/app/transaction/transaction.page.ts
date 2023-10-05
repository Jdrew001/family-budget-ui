import { Component, OnInit } from '@angular/core';
import { TransactionService } from './transaction.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
  
  get accountBalanceSummary() { return this.transactionService.accountBalanceSummary; }
  get groupedTransactions() { return this.transactionService.groupTransactions; }

  constructor(
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.fetchTransactionGroups();
  }

  fetchTransactionGroups() {
    this.transactionService.initialize();
  }

  handleAccountAction(id) {
    
  }

  onIonInfinite(event) {
    this.transactionService.getTransactionGroups(event);
  }

}
