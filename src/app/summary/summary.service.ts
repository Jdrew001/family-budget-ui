import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../core/services/base.service';
import { SummaryConstant } from './summary.constant';
import { Observable, switchMap, zip } from 'rxjs';
import { CurrentBudgetSummary, SummaryAccountBalance, SummaryTransactions } from './model/summary.model';

@Injectable({
  providedIn: 'root'
})
export class SummaryService extends BaseService {

  private _currentBudgetSummary: CurrentBudgetSummary = null;
  get currentBudgetSummary() { return this._currentBudgetSummary; }
  set currentBudgetSummary(value) { this._currentBudgetSummary = value; }

  private _accountBalanceSummary: SummaryAccountBalance[] = [];
  get accountBalanceSummary() { return this._accountBalanceSummary; }
  set accountBalanceSummary(value) { this._accountBalanceSummary = value; }

  private _transactionSummary: SummaryTransactions[] = null;
  get transactionSummary() { return this._transactionSummary; }
  set transactionSummary(value) { this._transactionSummary = value; }

  private _accountId: string = 'c30f8277-98f4-42d5-9c62-56559a038594';
  get accountId() { return this._accountId; }
  set accountId(value) { this._accountId = value; }

  constructor(
    private readonly http: HttpClient
  ) { 
    super();
  }

  getSummaryData() {
    this.getAccountBalances().pipe(
      switchMap((accountBalances) => {
        this.accountBalanceSummary = accountBalances;
        const currentBudgetSummary = this.getCurrentBudgetSummary(this.accountId);
        const accountTransactions = this.getAccountTransactions(this.accountId);
        return zip(currentBudgetSummary, accountTransactions);
      })
    ).subscribe(([currentBudgetSummary, accountTransactions]) => {
      this.currentBudgetSummary = currentBudgetSummary as CurrentBudgetSummary;
      this.transactionSummary = accountTransactions as SummaryTransactions[];
    });
  }

  public getCurrentBudgetSummary(accountId: string) {
    return this.http.get(`${this.BASE_URL}${SummaryConstant.CURRENT_BUDGET}/${accountId}`);
  }

  public getAccountBalances(): Observable<SummaryAccountBalance[]> {
    return this.http.get(`${this.BASE_URL}${SummaryConstant.ACCOUNT_BALANCES}`) as Observable<SummaryAccountBalance[]>;
  }

  public getAccountTransactions(accountId: string) {
    return this.http.get(`${this.BASE_URL}${SummaryConstant.TRANSACTIONS}/${accountId}`);
  }
}
