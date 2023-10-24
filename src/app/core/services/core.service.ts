import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ManageBudgetConstant } from 'src/app/manage-budget/manage-budget.constant';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { CoreConstants } from '../constants/core.constants';
import { MasterRefdata } from '../models/master-ref.model';

@Injectable({
  providedIn: 'root'
})
export class CoreService extends BaseService {

  $shouldRefreshScreen: Subject<boolean> = new Subject<boolean>();
  $showManageTransaction: Subject<{data: any, show: boolean}> = new Subject<{data: any, show: boolean}>();

  masterRefData: MasterRefdata;

  constructor(
    private readonly http: HttpClient
  ) { 
    super();
  }

  getBudgetCategoryRefData(id: string) {
    const url = `${this.BASE_URL}${ManageBudgetConstant.MANAGE_BUDGET_REF_DATA}/${id}`;
    return this.http.get(url) as Observable<any>;
  }

  getMasterRefData() {
    const url = `${this.BASE_URL}${CoreConstants.MASTER_REF_DATA}`;
    this.http.get<MasterRefdata>(url).subscribe((result: MasterRefdata) => {
      this.masterRefData = result;
    });
  }
}
