import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { UserConstants } from './user.constant';
import { Storage } from '@ionic/storage-angular';
import { UserAccountModel, UserModel } from '../../models/user.model';
import { Observable } from 'rxjs';
import { SummaryAccountBalance } from '../../models/account.model';
import { HelperService } from '../helper.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private helperService: HelperService
  ) {
  }

  fetchUserInformation() {
    const url = this.helperService.getResourceUrl(UserConstants.GET_USERINFO);
    this.http.get<UserModel>(url).subscribe(async (response: UserModel) => {
      this.storeUserInformation(response);
      console.log('userInformation', await this.storage.get('userInformation'));
    });
  }

  fetchAccountsForUser() {
    const url = this.helperService.getResourceUrl(UserConstants.GET_ACCOUNTS);
    return this.http.get(url) as Observable<UserAccountModel[]>;
  }

  fetchAccountBalancesForUser(): Observable<SummaryAccountBalance[]> {
    const url = this.helperService.getResourceUrl(UserConstants.GET_ACCOUNT_BALANCES);
    return this.http.get(url) as Observable<SummaryAccountBalance[]>;
  }

  private async storeUserInformation(userInformation: UserModel) {
    await this.storage.set('userInformation', null);
    await this.storage.set('userInformation', userInformation);
  }

  public async getUserInformation(): Promise<UserModel> {
    return await this.storage.get('userInformation') as Promise<UserModel>;
  }
}
