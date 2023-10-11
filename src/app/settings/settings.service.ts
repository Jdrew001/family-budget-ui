import { Injectable } from '@angular/core';
import { BaseService } from '../core/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { UserService } from '../core/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService extends BaseService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
    super();
  }

  async fetchProfileInfo() {
    return await this.userService.getUserInformation();
  }
}
