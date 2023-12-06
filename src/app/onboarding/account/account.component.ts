import { Component, Input, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AddAccountComponent } from 'src/app/shared/components/add-account/add-account.component';
import { OnboardingFormService } from '../services/onboarding-form.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent  implements OnInit {

  @Input() accountForm: FormArray;

  constructor(
    private modalController: ModalController,
    private onboardingFormService: OnboardingFormService
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

  private handleModalOutput(data, action: string) {
    if (action == 'confirm') {
      this.onboardingFormService.createAccountFormGroup(data);
    }

    if (action == 'delete') {
      this.onboardingFormService.deleteAccountFormGroup(data); // id
    }
  }
}
