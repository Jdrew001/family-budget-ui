import { Injectable } from '@angular/core';
import { BaseService } from '../core/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { GroupTransaction, TransactionGroupRequest, TransactionGroupResponse } from './model/transaction.model';
import { UserService } from '../core/services/user/user.service';
import { SummaryAccountBalance } from '../core/models/account.model';
import { TransactionConstant } from './transaction.constant';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { HelperService } from '../core/services/helper.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private _groupTransactions: GroupTransaction[] = [];
  get groupTransactions(): GroupTransaction[] { return this._groupTransactions; }
  set groupTransactions(value: GroupTransaction[]) { this._groupTransactions = value; }

  private _accountId: string = '';
  get accountId(): string { return this._accountId; }
  set accountId(value: string) { this._accountId = value; }

  private _accountBalanceSummary: SummaryAccountBalance[] = null;
  get accountBalanceSummary() { return this._accountBalanceSummary; }
  set accountBalanceSummary(value) { this._accountBalanceSummary = value; }

  pageSize = 25;
  page = 1;

  private _pageInitialized: boolean = false;
  get pageInitialized(): boolean { return this._pageInitialized; }
  set pageInitialized(value: boolean) { this._pageInitialized = value; }

  private _scrollDisabled: boolean = false;
  get scrollDisabled(): boolean { return this._scrollDisabled; }
  set scrollDisabled(value: boolean) { this._scrollDisabled = value; }


  constructor(
    private http: HttpClient,
    private userService: UserService,
    private helperService: HelperService
  ) {}

  async initialize() {
    this.userService.fetchAccountBalancesForUser().pipe(
      switchMap((accountBalances) => {
        this.accountBalanceSummary = accountBalances;
        console.log('bal', this.accountBalanceSummary);
        this.accountId = accountBalances?.find(item => item.active)?.id as string;
        return this.getTransactionsForAccount();
      })).subscribe((response: TransactionGroupResponse) => this.updateTransactionData(response));
  }

  getTransactionGroups(event?: InfiniteScrollCustomEvent) {
    const page = this.page + 1;
    this.getTransactionsForAccount(page).subscribe((response: TransactionGroupResponse) => {
      this.updateTransactionData(response);
      setTimeout(() => {
        event?.target?.complete();
      }, 500);
      this.scrollDisabled = false;
    });
  }

  getTransactionsForAccount(page?: number) {
    const selPage = page || this.page;
    console.log('selPage', selPage, this.page);
    const body: TransactionGroupRequest = {
      page: selPage <= 0 ? 1 : selPage,
      size: this.pageSize,
      accountId: this.accountId
    }
    this.scrollDisabled = false;
    const url = this.helperService.getResourceUrl(TransactionConstant.GROUPED_TRANSACTION_URL);
    return this.http.post(url, body) as Observable<any>;
  }

  updateTransactionData(response: TransactionGroupResponse) {
    this.pageSize = response.pageSize;
    this.page = response.page;

    response.transactions.forEach(item => {
      const groupToAddTo = this.groupTransactions.find(group => group.groupName === item.groupName);
      if (groupToAddTo) {
        groupToAddTo.transactions = [...groupToAddTo.transactions, ...item.transactions];
      } else {
        this.groupTransactions.push(item);
      }
    });
    this.pageInitialized = true;
  }
}
