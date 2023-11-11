import { Injectable } from '@angular/core';
import { BaseService } from '../core/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { UserService } from '../core/services/user/user.service';
import { IdName } from '../core/models/account.model';
import { SettingsConstant } from './settings.constant';
import { AccountModel, CategoriesModel } from './models/settings.model';
import { HelperService } from '../core/services/helper.service';
import { Observable } from 'rxjs';

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

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private helperService: HelperService
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
    const url = this.helperService.getResourceUrl(SettingsConstant.INVITE_USER);
    return this.http.post(url, { familyId, email, action: 'INVITE' }) as Observable<any>;
  }
}
