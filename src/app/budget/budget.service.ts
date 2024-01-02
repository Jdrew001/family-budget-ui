import { Injectable } from '@angular/core';
import { BaseService } from '../core/services/base.service';
import { BudgetConstant } from './budget.constant';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { CategoriesForBudget, LeftSpendingManage } from '../core/models/left-spending.model';
import { HelperService } from '../core/services/helper.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private _budgetSummary: Array<LeftSpendingManage> = [];
  get budgetSummary() { return this._budgetSummary; }
  set budgetSummary(value) { this._budgetSummary = value; }

  private _categoriesForBudget: Array<CategoriesForBudget> = [];
  get categoriesForBudget() { return this._categoriesForBudget; }
  set categoriesForBudget(value) { this._categoriesForBudget = value; }

  private _currentBudget: LeftSpendingManage;
  get currentBudget() { return this._currentBudget; }
  set currentBudget(value) { this._currentBudget = value; }

  private _pageInitialized = false;
  get pageInitialized() { return this._pageInitialized; }
  set pageInitialized(value) { this._pageInitialized = value; }

  constructor(
    private http: HttpClient,
    private helperService: HelperService
  ) {
  }

  initialize() {
    this.getAllBudgets().pipe(
      switchMap((currentBudget: Array<LeftSpendingManage>) => {
        this.budgetSummary = currentBudget;
        this.currentBudget = this.budgetSummary[0];

        if (currentBudget.length === 0) {
          this.pageInitialized = true;
          return EMPTY;
        }

        return this.getBudgetCategories(currentBudget[0]);
      })
    ).subscribe(result => {
      this.categoriesForBudget = result;
      this.pageInitialized = true;
    });
  }

  getBudgetCategories(budgetSummary: LeftSpendingManage): Observable<Array<CategoriesForBudget>> {
    const url = this.helperService.getResourceUrl(BudgetConstant.GET_CATEGORIES_FOR_BUDGET);
    return this.http.get(`${url}${budgetSummary.id}`) as Observable<Array<CategoriesForBudget>>;
  }

  resetBudget() {
    this.budgetSummary = [];
    this.categoriesForBudget = [];
    this.currentBudget = null;
    this.pageInitialized = false;
  }

  private getAllBudgets(): Observable<Array<LeftSpendingManage>> {
    const url = this.helperService.getResourceUrl(BudgetConstant.GET_ALL_BUDGETS);
    return this.http.get(`${url}`) as Observable<Array<LeftSpendingManage>>;
  }
}
