import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { UserConstants } from './user.constant';
import { Storage } from '@ionic/storage-angular';
import { UserModel } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {
    super();
  }

  fetchUserInformation() {
    const url = `${this.BASE_URL}${UserConstants.GET_USERINFO}`;
    this.http.get(url).subscribe(async (response: UserModel) => {
      this.storeUserInformation(response);
      console.log('userInformation', await this.storage.get('userInformation'));
    });
  }

  private async storeUserInformation(userInformation: UserModel) {
    await this.storage.set('userInformation', null);
    await this.storage.set('userInformation', userInformation);
  }

  public async getUserInformation(): Promise<UserModel> {
    return await this.storage.get('userInformation') as Promise<UserModel>;
  }
}