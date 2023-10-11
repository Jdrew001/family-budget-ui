import { Component, OnInit } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { SettingsService } from './settings.service';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, ViewDidEnter {

  userInformation: any;

  constructor(
    private settingsService: SettingsService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  async logout() {
    await this.authService.logout();
  }

  async ionViewDidEnter() {
      this.userInformation = await this.settingsService.fetchProfileInfo();
  }

}
