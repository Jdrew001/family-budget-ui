import { Component, Input, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AddAccountComponent } from 'src/app/shared/components/add-account/add-account.component';
import { OnboardingFormService } from '../services/onboarding-form.service';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent  implements OnInit {

  @Input() accountForm: FormArray;

  get accountTypeInputs() {
    return this.coreService.masterRefData?.accountTypes || [];
  }

  constructor(
    private modalController: ModalController,
    private onboardingFormService: OnboardingFormService,
    private coreService: CoreService
  ) { }

  ngOnInit() {}

  addAccount() {
    this.presetAccountModal();
  }

  private async presetAccountModal(account = null) {
    const modal = await this.modalController.create({
      component: AddAccountComponent,
      componentProps: {
        onboarding: true,
        account: account
      }
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();
    this.handleModalOutput(data, role);
  }

  handleAccountAction(account) {
    this.presetAccountModal(account);
  }

  getAccountType(accountType: string) {
    return this.accountTypeInputs.find((account) => account.id == accountType)?.label;
  }

  private handleModalOutput(data, action: string) {
    if (action == 'confirm' && data?.id == '') {
      this.onboardingFormService.createAccountFormGroup(data);
    }

    if (action == 'confirm' && data?.id != '') {
      this.onboardingFormService.patchAccountFormGroup(data);
    }

    if (action == 'delete') {
      this.onboardingFormService.deleteAccountFormGroup(data); // id
    }
  }
}
