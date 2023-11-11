import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { SettingsService } from './settings.service';
import { AuthService } from '../core/services/auth.service';
import { AddAccountComponent } from './add-account/add-account.component';
import { IdName } from '../core/models/account.model';
import { AddFamilyComponent } from './add-family/add-family.component';
import { FamilyUserModel } from './models/settings.model';
import { UserModel } from '../core/models/user.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, ViewDidEnter, ViewDidLeave {

  @ViewChild('addAccount') addAccountComponent: AddAccountComponent;
  @ViewChild('addFam') AddFamilyComponent: AddFamilyComponent = {} as AddFamilyComponent;

  userInformation: any = {
    family: {
      id: null,
      users: []
    }
  };

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

  ionViewDidLeave(): void {
    this.settingsService.accounts = [];
    this.settingsService.categories = [];
    this.userInformation = {
      family: {
        id: null,
        users: []
      }
    }
  }

  async manageAccount() {
    this.presetAccountModal(); 
  }

  manageFamily() {
    this.AddFamilyComponent.presentModal();
  }

  handleAccountClick(account) {
    this.presetAccountModal(account);  
  }

  editFamilyUser(user: FamilyUserModel) {
    this.AddFamilyComponent.presentModal(user);
  }

  onFamilyConfirm(email: string) {
    this.settingsService.inviteUser(this.userInformation.family.id, email).subscribe(result => {
      this.AddFamilyComponent.dismissModal();
    });
  }

  onFamilyRemove({id, invitePending}) {
    
  }

  private async presetAccountModal(account = null) {
    const modal = await this.modalController.create({
      component: AddAccountComponent,
      componentProps: {
        account: account
      }
    });

    modal.present();
  }
}
