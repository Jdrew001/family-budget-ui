import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ManageBudgetConstant } from 'src/app/manage-budget/manage-budget.constant';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoreService extends BaseService {

  $shouldRefreshScreen: Subject<boolean> = new Subject<boolean>();
  $showManageTransaction: Subject<{data: any, show: boolean}> = new Subject<{data: any, show: boolean}>();

  constructor(
    private readonly http: HttpClient
  ) { 
    super();
  }

  getBudgetCategoryRefData(id: string) {
    const url = `${this.BASE_URL}${ManageBudgetConstant.MANAGE_BUDGET_REF_DATA}/${id}`;
    return this.http.get(url) as Observable<any>;
  }
}
