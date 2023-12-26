import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { SettingsService } from './settings.service';
import { AuthService } from '../core/services/auth.service';
import { AccountModel, FamilyUserModel } from './models/settings.model';
import { AddAccountComponent } from '../shared/components/add-account/add-account.component';
import { AddFamilyComponent } from '../shared/components/add-family/add-family.component';
import { AddCategoryComponent } from '../shared/components/add-category/add-category.component';
import { loadingContentAnimation } from '../shared/animations/loading-animation';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  animations: [loadingContentAnimation]
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

  get pageInitialized() { return this.settingsService.pageInitialized; }

  placeHolderData = [{}, {}];

  constructor(
    private settingsService: SettingsService,
    private authService: AuthService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async logout() {
    this.ionViewDidLeave();
    await this.authService.logout();
  }

  async ionViewDidEnter() {
      this.userInformation = await this.settingsService.fetchProfileInfo();
      this.settingsService.initial();
  }

  ionViewDidLeave(): void {
    this.settingsService.familyMembers = [];
    this.settingsService.accounts = [];
    this.settingsService.categories = [];
    this.settingsService.pageInitialized = false;
    this.userInformation = {
      family: {
        id: null,
        users: []
      }
    }
  }

  async manageAccount() {
    this.presentAccountModal(); 
  }

  manageCategory(category = null) {
    this.presentCategoryModal(category);
  }

  manageFamily() {
    this.AddFamilyComponent.presentModal();
  }

  handleAccountClick(account) {
    this.settingsService.getAccountById(account?.id).subscribe((result: AccountModel) => {
      this.presentAccountModal(result);  
    }); 
  }

  editFamilyUser(user: FamilyUserModel) {
    this.AddFamilyComponent.presentModal(user);
  }

  onFamilyConfirm(email: any) {
    this.settingsService.inviteUser(this.userInformation.family.id, email).subscribe(result => {
      this.AddFamilyComponent.dismissModal();
      this.settingsService.initial();
    });
  }

  async onFamilyRemove({email, invitePending}) {
    (await this.settingsService.removeFamilyMember(this.userInformation.family.id, email, invitePending)).subscribe(result => {
      this.AddFamilyComponent.dismissModal();
      this.settingsService.initial();
    });
  }

  private async presentCategoryModal(category = null) {
    const modal = await this.modalController.create({
      component: AddCategoryComponent,
      componentProps: {
        category: category
      }
    });

    modal.present();
    const { data, role } = await modal.onWillDismiss();
    this.settingsService.handleCategoryModalDismiss(data, role);
  }

  private async presentAccountModal(result = null) {
    const modal = await this.modalController.create({
      component: AddAccountComponent,
      componentProps: {
        disabledFields: result?.disabledFields,
        account: result?.data
      }
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();
    this.settingsService.handleAccountModalDismiss(data, role);
  }
}
