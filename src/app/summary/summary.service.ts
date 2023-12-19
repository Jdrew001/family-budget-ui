import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SummaryConstant } from './summary.constant';
import { EMPTY, Observable, switchMap, zip } from 'rxjs';
import { CurrentBudgetSummary, SummaryTransactions } from './model/summary.model';
import { SummaryAccountBalance } from '../core/models/account.model';
import { HelperService } from '../core/services/helper.service';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  private _currentBudgetSummary: CurrentBudgetSummary;
  get currentBudgetSummary() { return this._currentBudgetSummary; }
  set currentBudgetSummary(value) { this._currentBudgetSummary = value; }

  private _accountBalanceSummary: SummaryAccountBalance[] = null;
  get accountBalanceSummary() { return this._accountBalanceSummary; }
  set accountBalanceSummary(value) { this._accountBalanceSummary = value; }

  private _transactionSummary: SummaryTransactions[] = null;
  get transactionSummary() { return this._transactionSummary; }
  set transactionSummary(value) { this._transactionSummary = value; }

  private _accountId: string = '';
  get accountId() { return this._accountId; }
  set accountId(value) { this._accountId = value; }

  private _pageInitialized: boolean = false;
  get pageInitialized(): boolean { return this._pageInitialized; }
  set pageInitialized(value: boolean) { this._pageInitialized = value; }

  constructor(
    private readonly http: HttpClient,
    private readonly helperService: HelperService
  ) { 
  }

  getSummaryData() {
    this.accountBalanceSummary;
    this.getAccountBalances().pipe(
      switchMap((accountBalances) => {
        this.accountBalanceSummary = accountBalances;
        this.accountId = accountBalances?.find(item => item.active)?.id as string;

        if (!this.accountId) return EMPTY;
        const currentBudgetSummary = this.getCurrentBudgetSummary();
        const accountTransactions = this.getAccountTransactions();
        return zip(currentBudgetSummary, accountTransactions);
      })
    ).subscribe(([currentBudgetSummary, accountTransactions]) => {
      this.currentBudgetSummary = currentBudgetSummary as CurrentBudgetSummary;
      this.transactionSummary = accountTransactions as SummaryTransactions[];

      this.pageInitialized = true;
    });
  }

  getAccountBudgetTransactions() {
    const currentBudgetSummary = this.getCurrentBudgetSummary();
    const accountTransactions = this.getAccountTransactions();
    return zip(currentBudgetSummary, accountTransactions)
      .subscribe(([currentBudgetSummary, accountTransactions]) => {
        this.currentBudgetSummary = currentBudgetSummary as CurrentBudgetSummary;
        this.transactionSummary = accountTransactions as SummaryTransactions[];
    });;
  }

  public getCurrentBudgetSummary() {
    const url = this.helperService.getResourceUrl(SummaryConstant.CURRENT_BUDGET);
    return this.http.get(`${url}/${this.accountId}`);
  }

  public getAccountBalances(): Observable<SummaryAccountBalance[]> {
    const url = this.helperService.getResourceUrl(SummaryConstant.ACCOUNT_BALANCES);
    return this.http.get(url) as Observable<SummaryAccountBalance[]>;
  }

  public getAccountTransactions() {
    const url = this.helperService.getResourceUrl(SummaryConstant.TRANSACTIONS);
    return this.http.get(`${url}/${this.accountId}`);
  }

  public resetSummaryData() {
    this.currentBudgetSummary = null;
    this.accountBalanceSummary = null;
    this.transactionSummary = null;
    this.pageInitialized = false;
  }
}
