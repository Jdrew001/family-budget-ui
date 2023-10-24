import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, ViewDidEnter } from '@ionic/angular';
import { SettingsService } from './settings.service';
import { AuthService } from '../core/services/auth.service';
import { AddAccountComponent } from './add-account/add-account.component';
import { IdName } from '../core/models/account.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, ViewDidEnter {

  @ViewChild('addAccount') addAccountComponent: AddAccountComponent;

  userInformation: any;

  get accounts() { return this.settingsService.accounts; }
  get categories() { return this.settingsService.categories; }

  constructor(
    private settingsService: SettingsService,
    private authService: AuthService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async logout() {
    await this.authService.logout();
  }

  async ionViewDidEnter() {
      this.userInformation = await this.settingsService.fetchProfileInfo();
      this.settingsService.fetchAccount();
      this.settingsService.fetchCategories();
  }

  async manageAccount() {
    this.addAccountComponent.presentModal();
  }

  handleAccountClick(account) {
    this.addAccountComponent.presentModal(account);
  }

  handleNewAccount(data: IdName) {
    this.settingsService.createAccount(data);
  }
}
