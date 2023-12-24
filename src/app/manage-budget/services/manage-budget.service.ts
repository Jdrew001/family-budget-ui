import { Injectable } from '@angular/core';
import { ManageBudgetConstant } from '../manage-budget.constant';
import { HttpClient } from '@angular/common/http';
import { Observable, zip } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesForBudget, LeftSpendingManage } from 'src/app/core/models/left-spending.model';
import { HelperService } from 'src/app/core/services/helper.service';
import { CoreService } from 'src/app/core/services/core.service';
import { TransactionType } from 'src/app/core/models/transaction-type.model';

@Injectable({
  providedIn: 'root'
})
export class ManageBudgetService {

  addCategoryForm: FormGroup = new FormGroup({
    amount: new FormControl('', [Validators.required]),
    id: new FormControl('', [Validators.required]),
  });

  private _manageBudgetSummary: LeftSpendingManage;
  private _manageBudgetCategories: CategoriesForBudget[];
  private _pageInitialized: boolean = false;
  private _budgetCategoryRefData: Array<{id: string, name: string, type: TransactionType, icon: string}> = [];

  get manageBudgetSummary() {
    return this._manageBudgetSummary;
  }
  set manageBudgetSummary(value: LeftSpendingManage) {
    this._manageBudgetSummary = value;
  }

  get manageBudgetCategories() {
    return this._manageBudgetCategories;
  }

  set manageBudgetCategories(value: CategoriesForBudget[]) {
    this._manageBudgetCategories = value;
  }

  get budgetCategoryRefData() { return this._budgetCategoryRefData; }
  set budgetCategoryRefData(value) { this._budgetCategoryRefData = value; }

  get pageInitialized() { return this._pageInitialized; }
  set pageInitialized(value: boolean) { this._pageInitialized = value; }

  constructor(
    private http: HttpClient,
    private helperService: HelperService,
    private coreService: CoreService
  ) {
  }

  addCategoryToBudget(id: string) {
    const url = this.helperService.getResourceUrl(ManageBudgetConstant.CREATE_BUDGET_CATEGORIES);
    const body = {
      budgetId: id,
      category: this.addCategoryForm.value
    }
    return this.http.post(url, body) as Observable<any>;
  }

  getAllData(id: string) {
    const bSummary = this.getManageBudgetSummary(id);
    const bTransactions = this.getManageBudgetCategories(id);
    const refData = this.coreService.getBudgetCategoryRefData(id);

    zip(bSummary, bTransactions, refData).subscribe(([summary, categories, refData]) => {
      this.manageBudgetSummary = summary;
      this.manageBudgetCategories = categories;
      this.budgetCategoryRefData = refData;
      this.pageInitialized = true;
    });
  }

  getManageBudgetSummary(id: string) {
    const url = this.helperService.getResourceUrl(ManageBudgetConstant.MANAGE_BUDGET_SUMMARY);
    return this.http.get(`${url}/${id}`) as Observable<LeftSpendingManage>;
  }

  getManageBudgetCategories(id: string) {
    const url = this.helperService.getResourceUrl(ManageBudgetConstant.MANAGE_BUDGET_CATEGORIES);
    return this.http.get(`${url}/${id}`) as Observable<CategoriesForBudget[]>;
  }

  getBudgetCategoryRefData(id: string) {
    const url = this.helperService.getResourceUrl(ManageBudgetConstant.MANAGE_BUDGET_REF_DATA);
    return this.http.get(`${url}/${id}`) as Observable<any>;
  }

  updateBudgetCategory(budgetId: string, value: { id: string; amount: string; }) {
    const url = this.helperService.getResourceUrl(ManageBudgetConstant.UPDATE_BUDGET_CATEGORY);
    return this.http.post(url, {budgetId: budgetId, category: value}) as Observable<any>;
  }

  deleteBudgetCategory(budgetCategoryId: string) {
    const url = this.helperService.getResourceUrl(ManageBudgetConstant.DELETE_BUDGET_CATEGORY);
    return this.http.get(`${url}/${budgetCategoryId}`) as Observable<any>;
  }

  resetData() {
    this.manageBudgetSummary = null;
    this.manageBudgetCategories = null;
    this.pageInitialized = false;
    this.budgetCategoryRefData = [];
  }
}
