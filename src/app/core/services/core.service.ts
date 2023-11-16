import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ManageBudgetConstant } from 'src/app/manage-budget/manage-budget.constant';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { CoreConstants } from '../constants/core.constants';
import { MasterRefdata } from '../models/master-ref.model';
import { HelperService } from './helper.service';
import { GenericModel } from '../models/generic.model';
import { AlertModal } from 'src/app/shared/components/alert-box/alert-box.model';
import { ActionStrategyMapping } from '../constants/alert-key.constants';

@Injectable({
  providedIn: 'root'
})
export class CoreService extends BaseService {

  $shouldRefreshScreen: Subject<boolean> = new Subject<boolean>();
  $showManageTransaction: Subject<{data: any, show: boolean}> = new Subject<{data: any, show: boolean}>();

  masterRefData: MasterRefdata;

  constructor(
    private readonly http: HttpClient,
    private helperService: HelperService
  ) { 
    super();
  }

  handleAlertAction(payload: {action: string, data: any}) {
    if (!!payload.action) {
      try {
        const actionHandler = new ActionStrategyMapping[payload.action](this);
        actionHandler.execute(payload.data);
      } catch (error) {
        console.log('action handler err', error);
      }
    }
  }

  getBudgetCategoryRefData(id: string) {
    const url = this.helperService.getResourceUrl(ManageBudgetConstant.MANAGE_BUDGET_REF_DATA);
    return this.http.get(`${url}/${id}`) as Observable<any>;
  }

  getMasterRefData() {
    const url = this.helperService.getResourceUrl(CoreConstants.MASTER_REF_DATA);
    this.http.get<MasterRefdata>(url).subscribe((result: MasterRefdata) => {
      this.masterRefData = result;
    });
  }

  checkFamilyStatus() {
    const url = this.helperService.getResourceUrl(CoreConstants.CHECK_FAMILY_STATUS);
    return this.http.get<GenericModel<{familyId: string, dialogConfig: AlertModal}>>(url);
  }

  confirmFamilySwitch(familyId: string) {
    const url = this.helperService.getResourceUrl(CoreConstants.CONFIRM_FAMILY_SWITCH);
    return this.http.get(`${url}/${familyId}`);
  }
}
