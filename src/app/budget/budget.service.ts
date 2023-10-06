import { Injectable } from '@angular/core';
import { BaseService } from '../core/services/base.service';
import { BudgetConstant } from './budget.constant';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { CategoriesForBudget, LeftSpendingManage } from '../core/models/left-spending.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService extends BaseService {

  private _activeAccountName: string;
  get activeAccountName() { return this._activeAccountName; }
  set activeAccountName(value) { this._activeAccountName = value; }

  private _budgetSummary: Array<LeftSpendingManage> = [];
  get budgetSummary() { return this._budgetSummary; }
  set budgetSummary(value) { this._budgetSummary = value; }

  private _categoriesForBudget: Array<CategoriesForBudget> = [];
  get categoriesForBudget() { return this._categoriesForBudget; }
  set categoriesForBudget(value) { this._categoriesForBudget = value; }

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  initialize() {
    this.getAllBudgets().pipe(
      switchMap((currentBudget: Array<LeftSpendingManage>) => {
        this.budgetSummary = currentBudget;
        this.activeAccountName = this.budgetSummary[0]?.accountName;
        return this.getBudgetCategories(currentBudget[0]);
      })
    ).subscribe(result => {
      this.categoriesForBudget = result;
    });
  }

  getBudgetCategories(budgetSummary: LeftSpendingManage): Observable<Array<CategoriesForBudget>> {
    const url = BudgetConstant.GET_CATEGORIES_FOR_BUDGET;
    return this.http.get(`${this.BASE_URL}${url}${budgetSummary.id}`) as Observable<Array<CategoriesForBudget>>;
  }

  private getAllBudgets(): Observable<Array<LeftSpendingManage>> {
    const url = BudgetConstant.GET_ALL_BUDGETS;
    return this.http.get(`${this.BASE_URL}${url}`) as Observable<Array<LeftSpendingManage>>;
  }
}
