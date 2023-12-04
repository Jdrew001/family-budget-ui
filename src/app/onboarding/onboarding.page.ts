import { Component, OnInit } from '@angular/core';
import { OnboardingConstant } from './onboarding.constant';
import { OnboardingFormService } from './services/onboarding-form.service';
import { OnboardingService } from './services/onboarding.service';
import { FormArray, FormGroup } from '@angular/forms';
import { CoreService } from '../core/services/core.service';
import { RegistrationStatus } from '../core/models/registration-status.model';
import { ToastService } from '../core/services/toast.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

  registrationStatus: RegistrationStatus = {
    onboarded: false,
    userInvited: false,
    isPartial: false,
    requiredSections: []
  };

  get onboardingForm() { return this.onboardingFormService.onboardingForm; }
  get profileForm() { return this.onboardingForm.get('profile') as FormGroup; }
  get accountsFormArray() { return this.onboardingForm.get('accounts') as FormArray; }
  get categoriesFormArray() { return this.onboardingForm.get('categories') as FormArray; }
  get familyInvitesFormArray() { return this.onboardingForm.get('familyInvites') as FormArray; }

  currentPage = 0;

  constructor(
    private onboardingService: OnboardingService,
    private onboardingFormService: OnboardingFormService,
    private coreService: CoreService,
    private toastService: ToastService,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.checkOnboardingSteps();
    this.onboardingFormService.createFormGroup();
  }

  getTitleDescription(type: 'title' | 'description') {
    const data = OnboardingConstant.ONBOARDING_PAGE_DATA[this.currentPage];
    if (!data) return '';

    return data[type];
  }

  checkOnboardingSteps() {
    console.log('onboarding steps', this.coreService.onboardingRequiredSections);
  }

  nextStep() {
    
  }

  previousStep() {

  }

  submit() {
    if (this.onboardingForm.invalid) {
      this.onboardingForm.markAllAsTouched();
      this.toastService.showMessage('Please fill out all required fields', true);
      return;
    }

    this.onboardingService.onboardingSubmission(this.onboardingForm.value, this.registrationStatus.userInvited)
      .subscribe((res) => {
        if (res.success) {
          this.navController.navigateRoot('/tabs/summary', { replaceUrl:true });
        }
    });
  }
}
