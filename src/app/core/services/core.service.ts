import { Injectable } from '@angular/core';
import { Observable, Subject, zip } from 'rxjs';
import { ManageBudgetConstant } from 'src/app/manage-budget/manage-budget.constant';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { CoreConstants } from '../constants/core.constants';
import { MasterRefdata } from '../models/master-ref.model';
import { HelperService } from './helper.service';
import { GenericModel } from '../models/generic.model';
import { AlertModal } from 'src/app/shared/components/alert-box/alert-box.model';
import { Router } from '@angular/router';
import { SummaryAccountBalance } from '../models/account.model';
import { SummaryConstant } from 'src/app/summary/summary.constant';
import { RegistrationStatus } from '../models/registration-status.model';
import { OnboardingStatus } from '../models/onboarding-status.model';
import { UserService } from './user/user.service';
import { AlertControllerService } from 'src/app/shared/services/alert-controller.service';

@Injectable({
  providedIn: 'root'
})
export class CoreService extends BaseService {

  $shouldRefreshScreen: Subject<boolean> = new Subject<boolean>();
  $showManageTransaction: Subject<{data: any, show: boolean}> = new Subject<{data: any, show: boolean}>();

  masterRefData: MasterRefdata;

  onboardingRequiredSections: string[] = [];

  private _accountBalanceSummary: SummaryAccountBalance[] = [];
  get accountBalanceSummary() { return this._accountBalanceSummary; }
  set accountBalanceSummary(value) { this._accountBalanceSummary = value; }

  constructor(
    private readonly http: HttpClient,
    private helperService: HelperService,
    private userService: UserService,
    private router: Router
  ) { 
    super();
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

  checkOnboardingStatus() {
    const url = this.helperService.getResourceUrl(CoreConstants.CHECK_ONBOARD_STATUS);
    return (this.http.get(url)) as Observable<{success: string, message: string, data: OnboardingStatus}>;
  }

  confirmFamilySwitch(familyId: string) {
    const url = this.helperService.getResourceUrl(CoreConstants.CONFIRM_FAMILY_SWITCH);
    return this.http.get(`${url}/${familyId}`);
  }

  refreshView() {
    this.router.navigate(['/', this.router.url.split('/')[1]]);
  }  

  public getAccountBalances(): Observable<SummaryAccountBalance[]> {
    const url = this.helperService.getResourceUrl(SummaryConstant.ACCOUNT_BALANCES);
    return this.http.get(url) as Observable<SummaryAccountBalance[]>;
  }
}
