import { Injectable } from '@angular/core';
import { BaseService } from '../core/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { UserService } from '../core/services/user/user.service';
import { IdName } from '../core/models/account.model';
import { SettingsConstant } from './settings.constant';
import { CategoriesModel } from './models/settings.model';
import { HelperService } from '../core/services/helper.service';

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

  async createAccount(data: IdName) {
    const url = this.helperService.getResourceUrl(SettingsConstant.CREATE_ACCOUNT);
    this.http.post(url, data).subscribe((result: any) => {
      this.fetchAccount();
    });
  }
}
