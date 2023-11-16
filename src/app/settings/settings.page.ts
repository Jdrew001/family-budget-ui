import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { SettingsService } from './settings.service';
import { AuthService } from '../core/services/auth.service';
import { AddAccountComponent } from './add-account/add-account.component';
import { AddFamilyComponent } from './add-family/add-family.component';
import { FamilyUserModel } from './models/settings.model';
import { UserService } from '../core/services/user/user.service';

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
  get familyMembers() { return this.settingsService.familyMembers; }

  constructor(
    private settingsService: SettingsService,
    private authService: AuthService,
    private modalController: ModalController,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  async logout() {
    await this.authService.logout();
  }

  async ionViewDidEnter() {
      this.userInformation = await this.settingsService.fetchProfileInfo();
      this.settingsService.getFamilyMembers();
      this.settingsService.fetchAccount();
      this.settingsService.fetchCategories();
  }

  ionViewDidLeave(): void {
    this.settingsService.familyMembers = [];
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
      this.settingsService.resetFamilyMembers();
    });
  }

  async onFamilyRemove({email, invitePending}) {
    (await this.settingsService.removeFamilyMember(this.userInformation.family.id, email, invitePending)).subscribe(result => {
      this.AddFamilyComponent.dismissModal();
      this.settingsService.resetFamilyMembers();
    });
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
