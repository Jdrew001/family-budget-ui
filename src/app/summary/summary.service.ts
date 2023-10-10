import { Injectable, QueryList } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../core/services/base.service';
import { SummaryConstant } from './summary.constant';
import { EMPTY, Observable, Subject, switchMap, zip } from 'rxjs';
import { CurrentBudgetSummary, SummaryTransactions } from './model/summary.model';
import { SummaryAccountBalance } from '../core/models/account.model';
import { SharedService } from '../shared/services/shared/shared.service';
import { CircleGuageConstant } from '../shared/constants/circle-guage.constant';
import { CircleGaugeComponent } from '../shared/components/circle-gauge/circle-gauge.component';

@Injectable({
  providedIn: 'root'
})
export class SummaryService extends BaseService {

  private _currentBudgetSummary: CurrentBudgetSummary = {} as CurrentBudgetSummary;
  get currentBudgetSummary() { return this._currentBudgetSummary; }
  set currentBudgetSummary(value) { this._currentBudgetSummary = value; }

  private _accountBalanceSummary: SummaryAccountBalance[] = [];
  get accountBalanceSummary() { return this._accountBalanceSummary; }
  set accountBalanceSummary(value) { this._accountBalanceSummary = value; }

  private _transactionSummary: SummaryTransactions[] = [];
  get transactionSummary() { return this._transactionSummary; }
  set transactionSummary(value) { this._transactionSummary = value; }

  private _accountId: string = '';
  get accountId() { return this._accountId; }
  set accountId(value) { this._accountId = value; }

  constructor(
    private readonly http: HttpClient
  ) { 
    super();
  }

  getSummaryData() {
    this.accountBalanceSummary = [];
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
    return this.http.get(`${this.BASE_URL}${SummaryConstant.CURRENT_BUDGET}/${this.accountId}`);
  }

  public getAccountBalances(): Observable<SummaryAccountBalance[]> {
    return this.http.get(`${this.BASE_URL}${SummaryConstant.ACCOUNT_BALANCES}`) as Observable<SummaryAccountBalance[]>;
  }

  public getAccountTransactions() {
    return this.http.get(`${this.BASE_URL}${SummaryConstant.TRANSACTIONS}/${this.accountId}`);
  }
}
