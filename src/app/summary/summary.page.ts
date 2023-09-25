import { Component, OnInit } from '@angular/core';
import { SummaryService } from './summary.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {

  get currentBudgetSummary() { return this.summaryService.currentBudgetSummary; }
  get accountBalanceSummary() { return this.summaryService.accountBalanceSummary; }
  get transactionSummary() { return this.summaryService.transactionSummary; }

  constructor(
    public summaryService: SummaryService
  ) { }

  ngOnInit() {
    this.summaryService.getSummaryData();
  }

  onSeeMore() {
    console.log('See more clicked');
  }

}
