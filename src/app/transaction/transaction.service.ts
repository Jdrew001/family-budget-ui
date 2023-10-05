import { Injectable } from '@angular/core';
import { BaseService } from '../core/services/base.service';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';
import { GroupTransaction, TransactionGroupRequest, TransactionGroupResponse } from './model/transaction.model';
import { UserService } from '../core/services/user/user.service';
import { SummaryAccountBalance } from '../core/models/account.model';
import { TransactionConstant } from './transaction.constant';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends BaseService {

  private _groupTransactions: GroupTransaction[] = [];
  get groupTransactions(): GroupTransaction[] { return this._groupTransactions; }
  set groupTransactions(value: GroupTransaction[]) { this._groupTransactions = value; }

  private _accountId: string = '';
  get accountId(): string { return this._accountId; }
  set accountId(value: string) { this._accountId = value; }

  private _accountBalanceSummary: SummaryAccountBalance[] = [];
  get accountBalanceSummary() { return this._accountBalanceSummary; }
  set accountBalanceSummary(value) { this._accountBalanceSummary = value; }

  pageSize = 20;
  page = 1;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
    super();
  }

  async initialize() {
    this.userService.fetchAccountBalancesForUser().pipe(
      switchMap((accountBalances) => {
        this.accountBalanceSummary = accountBalances;
        this.accountId = accountBalances?.find(item => item.active)?.id;
        return this.getTransactionsForAccount();
      })).subscribe((response: TransactionGroupResponse) => this.updateTransactionData(response));
  }

  getTransactionGroups(event: InfiniteScrollCustomEvent) {
    const page = this.page + 1;
    this.getTransactionsForAccount(page).subscribe((response: TransactionGroupResponse) => {
      this.updateTransactionData(response);
      setTimeout(() => {
        event.target.complete();
      }, 500);
    });
  }

  private getTransactionsForAccount(page?: number) {
    const body: TransactionGroupRequest = {
      page: page || this.page,
      size: this.pageSize,
      accountId: this.accountId
    }
    return this.http.post(`${this.BASE_URL}${TransactionConstant.GROUPED_TRANSACTION_URL}`, body);
  }

  private updateTransactionData(response: TransactionGroupResponse) {
    this.pageSize = response.pageSize;
    this.page = response.page;
    this.groupTransactions = [...this.groupTransactions, ...response.transactions];
  }
}
