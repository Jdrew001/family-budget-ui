import { Component, OnInit } from '@angular/core';
import { OnboardingConstant } from './onboarding.constant';
import { OnboardingFormService } from './services/onboarding-form.service';
import { OnboardingService } from './services/onboarding.service';
import { FormArray, FormGroup } from '@angular/forms';
import { CoreService } from '../core/services/core.service';
import { RegistrationStatus } from '../core/models/registration-status.model';
import { ToastService } from '../core/services/toast.service';
import { NavController } from '@ionic/angular';
import { ArrayUtils } from '../shared/utils/array.utils';
import { OnBoardingStep } from './model/onboarding.model';
import { UserService } from '../core/services/user/user.service';

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
  get requiredSections() { return this.coreService.onboardingRequiredSections; }
  get sectionIndex() { return ArrayUtils.getArrayPosition(this.requiredSections, this.currentPage); }
  get userEmail() { return this.onboardingService.email; }

  currentPage = this.requiredSections[0];

  public OnboardingStep = OnBoardingStep;

  constructor(
    private onboardingService: OnboardingService,
    private onboardingFormService: OnboardingFormService,
    private coreService: CoreService,
    private userService: UserService,
    private toastService: ToastService,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.checkOnboardingSteps();
    this.onboardingFormService.createFormGroup();
    this.userService.fetchUserEmail().subscribe((res) => this.onboardingService.email = res?.data);
  }

  getTitleDescription(type: 'title' | 'description') {
    const data = OnboardingConstant.ONBOARDING_PAGE_DATA.find(item => item.key == this.currentPage)
    if (!data) return '';

    return data[type];
  }

  checkOnboardingSteps() {
    console.log('onboarding steps', this.coreService.onboardingRequiredSections);
  }

  nextStep() {
    if (this.currentPage == OnBoardingStep.Profile && this.profileForm.invalid) {
      this.showFormError();
      this.profileForm.markAllAsTouched();
      return;
    }

    if (this.currentPage == OnBoardingStep.Account && this.accountsFormArray.invalid) {
      this.showFormError();
      this.accountsFormArray.markAllAsTouched();
      return;
    }

    if (this.currentPage == OnBoardingStep.Category && this.categoriesFormArray.invalid) {
      this.showFormError();
      this.categoriesFormArray.markAllAsTouched();
      return;
    }

    if (this.currentPage == OnBoardingStep.InviteFamily && this.familyInvitesFormArray.invalid) {
      this.showFormError();
      this.familyInvitesFormArray.markAllAsTouched();
      return;
    }

    this.currentPage = ArrayUtils.getNextElement(this.requiredSections, this.sectionIndex);
  }

  previousStep() {
    this.currentPage = ArrayUtils.getPreviousElement(this.requiredSections, this.sectionIndex);
  }

  showFormError() {
    this.toastService.showMessage('Please fill out all required fields', true);
  }

  checkForStep(name) {
    return this.requiredSections.includes(name);
  }

  submit() {
    if (this.onboardingForm.invalid) {
      this.onboardingForm.markAllAsTouched();
      this.toastService.showMessage('Please fill out all required fields', true);
      return;
    }

    this.onboardingService.onboardingSubmission(this.onboardingForm.value, this.requiredSections)
      .subscribe((res) => {
        if (res.success) {
          this.navController.navigateRoot('/tabs/summary', { replaceUrl:true });
        }
    });
  }
}
