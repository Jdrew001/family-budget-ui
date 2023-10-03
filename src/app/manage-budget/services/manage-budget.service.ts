import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { ManageBudgetConstant } from '../manage-budget.constant';
import { HttpClient } from '@angular/common/http';
import { Observable, zip } from 'rxjs';
import { CategoriesForBudget, LeftSpendingManage } from '../model/left-spending.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ManageBudgetService extends BaseService {

  addCategoryForm: FormGroup = new FormGroup({
    amount: new FormControl('', [Validators.required]),
    id: new FormControl('', [Validators.required]),
  });

  private _manageBudgetSummary: LeftSpendingManage;
  private _manageBudgetCategories: CategoriesForBudget[];

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

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  addCategoryToBudget(id: string) {
    const url = `${this.BASE_URL}${ManageBudgetConstant.CREATE_BUDGET_CATEGORIES}`;
    const body = {
      budgetId: id,
      category: this.addCategoryForm.value
    }
    return this.http.post(url, body) as Observable<any>;
  }

  getAllData(id: string) {
    const bSummary = this.getManageBudgetSummary(id);
    const bTransactions = this.getManageBudgetCategories(id);

    zip(bSummary, bTransactions).subscribe(([summary, categories]) => {
      this.manageBudgetSummary = summary;
      this.manageBudgetCategories = categories;
    });
  }

  getManageBudgetSummary(id: string) {
    const url = `${this.BASE_URL}${ManageBudgetConstant.MANAGE_BUDGET_SUMMARY}/${id}`;
    return this.http.get(url) as Observable<LeftSpendingManage>;
  }

  getManageBudgetCategories(id: string) {
    const url = `${this.BASE_URL}${ManageBudgetConstant.MANAGE_BUDGET_CATEGORIES}/${id}`;
    return this.http.get(url) as Observable<CategoriesForBudget[]>;
  }

  getBudgetCategoryRefData(id: string) {
    const url = `${this.BASE_URL}${ManageBudgetConstant.MANAGE_BUDGET_REF_DATA}/${id}`;
    return this.http.get(url) as Observable<any>;
  }
}
