import { Injectable } from '@angular/core';
import { BaseService } from '../core/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { UserService } from '../core/services/user/user.service';
import { IdName } from '../core/models/account.model';
import { SettingsConstant } from './settings.constant';
import { CategoriesModel } from './models/settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService extends BaseService {

  private _accounts: IdName[] = [];
  get accounts(): IdName[] { return this._accounts; }
  set accounts(value: IdName[]) { this._accounts = value; }

  private _categories: CategoriesModel[] = [];
  get categories(): CategoriesModel[] { return this._categories; }
  set categories(value: CategoriesModel[]) { this._categories = value; }

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
    super();
  }

  async fetchProfileInfo() {
    return await this.userService.getUserInformation();
  }

  async fetchAccount() {
    this.http.get(`${this.BASE_URL}${SettingsConstant.FETCH_ACCOUNTS}`).subscribe((result: any) => {
      this.accounts = result;
    });
  }

  async fetchCategories() {
    this.categories = [];
    this.http.get(`${this.BASE_URL}${SettingsConstant.FETCH_CATEGORIES}`).subscribe((result: any) => {
      this.categories = result;
    });
  }

  async createAccount(data: IdName) {
    this.http.post(`${this.BASE_URL}${SettingsConstant.CREATE_ACCOUNT}`, data).subscribe((result: any) => {
      this.fetchAccount();
    });
  }
}
