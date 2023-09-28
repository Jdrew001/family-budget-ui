import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { TokenModel } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private storage: Storage
  ) { }

  async setToken(token: TokenModel) {
    await this.storage.set('token', token);
  }

  async getToken(): Promise<TokenModel> {
    return await this.storage.get('token');
  }

  async removeToken() {
    await this.storage.remove('token');
  }

  async hasToken() {
    return await this.storage.get('token') !== null;
  }
}
