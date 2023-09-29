import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SummaryService } from './summary.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {

  @ViewChild('slider') slider: ElementRef;

  get currentBudgetSummary() { return this.summaryService.currentBudgetSummary; }
  get accountBalanceSummary() { return this.summaryService.accountBalanceSummary; }
  get transactionSummary() { return this.summaryService.transactionSummary; }

  constructor(
    public summaryService: SummaryService
  ) { }

  ngOnInit() {
    this.summaryService.getSummaryData();
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

  onSeeMore() {
    console.log('See more clicked');
  }

}
