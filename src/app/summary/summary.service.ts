import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../core/services/base.service';
import { SummaryConstant } from './summary.constant';

@Injectable({
  providedIn: 'root'
})
export class SummaryService extends BaseService {

  constructor(
    private readonly http: HttpClient
  ) { 
    super();
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
