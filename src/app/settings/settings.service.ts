import { Injectable } from '@angular/core';
import { BaseService } from '../core/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { UserService } from '../core/services/user/user.service';
import { IdName } from '../core/models/account.model';
import { SettingsConstant } from './settings.constant';
import { AccountModel, CategoriesModel, CreateCategoryDto } from './models/settings.model';
import { HelperService } from '../core/services/helper.service';
import { Observable } from 'rxjs';
import { AddAccountComponent } from '../shared/components/add-account/add-account.component';
import { ToastService } from '../core/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private _accounts: IdName[] = [];
  get accounts(): IdName[] { return this._accounts; }
  set accounts(value: IdName[]) { this._accounts = value; }

  private _categories: CategoriesModel[] = [];
  get categories(): CategoriesModel[] { return this._categories; }
  set categories(value: CategoriesModel[]) { this._categories = value; }

  private _familyMembers: any[] = [];
  get familyMembers(): any[] { return this._familyMembers; }
  set familyMembers(value: any[]) { this._familyMembers = value; }

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private helperService: HelperService,
    private toastService: ToastService
  ) {
  }

  async fetchProfileInfo() {
    return await this.userService.getUserInformation();
  }

  async fetchAccount() {
    const url = this.helperService.getResourceUrl(SettingsConstant.FETCH_ACCOUNTS);
    this.http.get(url).subscribe((result: any) => {
      this.accounts = result;
    });
  }

  async fetchCategories() {
    this.categories = [];
    const url = this.helperService.getResourceUrl(SettingsConstant.FETCH_CATEGORIES);
    this.http.get(url).subscribe((result: any) => {
      this.categories = result;
    });
  }

  async getFamilyMembers() {
    const url = this.helperService.getResourceUrl(SettingsConstant.GET_FAMILY_MEMBERS);
    this.http.get(url).subscribe((result: any) => {
      this.familyMembers = result;
    });
  }

  createAccount(data: any): Observable<any> {
    const url = this.helperService.getResourceUrl(SettingsConstant.CREATE_ACCOUNT);
    return this.http.post(url, [data]) as Observable<any>;
  }

  markAccountInactive(id: string): Observable<any> {
    const url = this.helperService.getResourceUrl(SettingsConstant.MARK_ACCOUNT_INACTIVE);
    return this.http.get(`${url}/${id}`) as Observable<any>;
  }

  getAccountById(id: string): Observable<AccountModel> {
    const url = this.helperService.getResourceUrl(SettingsConstant.GET_ACCOUNT_BY_ID);
    return this.http.get(`${url}/${id}`) as Observable<AccountModel>;
  }

  inviteUser(familyId: string, email: string) {
    const url = this.helperService.getResourceUrl(SettingsConstant.MANAGE_INVITE);
    return this.http.post(url, { familyId, email, action: 'INVITE' }) as Observable<any>;
  }

  createCategory(data: CreateCategoryDto): Observable<any> {
    const url = this.helperService.getResourceUrl(SettingsConstant.CREATE_CATEGORY);
    return this.http.post(url, data) as Observable<any>;
  }

  async removeFamilyMember(familyId: string, email: string, invitePending: boolean) {
    const url = this.helperService.getResourceUrl(SettingsConstant.MANAGE_INVITE);
    const removeUserUrl = this.helperService.getResourceUrl(SettingsConstant.REMOVE_FAMILY_MEMBER);
    const leaveFamilyUrl = this.helperService.getResourceUrl(SettingsConstant.LEAVE_FAMILY);
    const isUserLeaving = email === (await this.userService.getUserInformation()).email;

    if (invitePending) {
      return this.http.post(url, { familyId, email, action: 'REMOVE' }) as Observable<any>;
    }

    if (isUserLeaving) {
      return this.http.get(leaveFamilyUrl) as Observable<any>;
    } else {
      return this.http.post(removeUserUrl, { familyId, email }) as Observable<any>;
    }
  }

  handleAccountModalDismiss(data: any, role: string) {
    if (role == 'confirm') {
      this.createAccount(data).subscribe((result: any) => {
        this.fetchAccount();
      });
    }

    if (role == 'delete') {
      this.markAccountInactive(data).subscribe(() => {
        this.fetchAccount();
      });
    }
  }

  handleCategoryModalDismiss(data: any, role: string) {
    if (role == 'confirm') {
      this.createCategory(data).subscribe((result) => {
        if (result && result.success) {
          this.fetchCategories();
        }
  
        this.toastService.showMessage(result.message, true);
      });
    }

    if(role == 'delete') {
      //TODO: this.deleteCategory(data);
    }
  }

  resetFamilyMembers() {
    this.familyMembers = [];
    this.getFamilyMembers();
  }
}
