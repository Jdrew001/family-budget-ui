import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../core/services/base.service';
import { SummaryConstant } from './summary.constant';
import { zip } from 'rxjs';
import { CurrentBudgetSummary, SummaryAccountBalance, SummaryTransactions } from './model/summary.model';

@Injectable({
  providedIn: 'root'
})
export class SummaryService extends BaseService {

  private _currentBudgetSummary: CurrentBudgetSummary = null;
  get currentBudgetSummary() { return this._currentBudgetSummary; }
  set currentBudgetSummary(value) { this._currentBudgetSummary = value; }

  private _accountBalanceSummary: SummaryAccountBalance = null;
  get accountBalanceSummary() { return this._accountBalanceSummary; }
  set accountBalanceSummary(value) { this._accountBalanceSummary = value; }

  private _transactionSummary: SummaryTransactions = null;
  get transactionSummary() { return this._transactionSummary; }
  set transactionSummary(value) { this._transactionSummary = value; }
  

  constructor(
    private readonly http: HttpClient
  ) { 
    super();
  }

  getSummaryData() {
    const currentBudgetSummary = this.getCurrentBudgetSummary();
    const accountBalances = this.getAccountBalances();
    const accountTransactions = this.getAccountTransactions('1');

    zip(currentBudgetSummary, accountBalances, accountTransactions)
      .subscribe(([currentBudgetSummary, accountBalances, accountTransactions]) => {
        this.currentBudgetSummary = currentBudgetSummary as CurrentBudgetSummary;
        this.accountBalanceSummary = accountBalances as SummaryAccountBalance;
        this.transactionSummary = accountTransactions as SummaryTransactions;
      });
  }

  public getCurrentBudgetSummary() {
    return this.http.get(`${this.BASE_URL}${SummaryConstant.CURRENT_BUDGET}`);
  }

  public getAccountBalances() {
    return this.http.get(`${this.BASE_URL}${SummaryConstant.ACCOUNT_BALANCES}`);
  }

  public getAccountTransactions(accountId: string) {
    return this.http.get(`${this.BASE_URL}${SummaryConstant.TRANSACTIONS}/${accountId}`);
  }
}
