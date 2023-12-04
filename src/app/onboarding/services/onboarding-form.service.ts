import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class OnboardingFormService {

  onboardingForm: FormGroup;

  get profileForm() { return this.onboardingForm.get('profile') as FormGroup; }
  get accountsFormArray() { return this.onboardingForm.get('accounts') as FormArray; }
  get categoriesFormArray() { return this.onboardingForm.get('categories') as FormArray; }
  get familyInvitesFormArray() { return this.onboardingForm.get('familyInvites') as FormArray; }

  constructor() { }

  createFormGroup() {
    this.onboardingForm = new FormGroup({
      profile: this.createProfileFormGroup(),
      accounts: this.createAccountsFormArray(),
      categories: this.createCategoriesFormArray(),
      familyInvites: this.createFamilyInvitesFormArray()
    });
  }

  createProfileFormGroup() {
    return new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required)
    });
  }

  setRequiredFields(requiredSections: string[]) {
    requiredSections.forEach((section) => {
      switch(section) {
        case 'profile':
          this.profileForm.setValidators(Validators.required);
          break;
        case 'accounts':
          this.accountsFormArray.setValidators(Validators.required);
          break;
        case 'categories':
          this.categoriesFormArray.setValidators(Validators.required);
          break;
        case 'familyInvites':
          this.familyInvitesFormArray.setValidators(Validators.required);
          break;
      }
    });
  }

  private createAccountsFormArray() {
    return new FormArray([]);
  }

  private createCategoriesFormArray() {
    return new FormArray([]);
  }

  private createFamilyInvitesFormArray() {
    return new FormArray([]);
  }
}
